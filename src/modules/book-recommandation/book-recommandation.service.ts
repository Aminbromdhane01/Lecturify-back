import { envConstants } from '@app/config/constants';
import type { IBookData } from '@app/modules/book-recommandation/book-data.type';
import type { IBookRecommandationService } from '@app/modules/book-recommandation/book-recommandation.service.interface';
import type { GetRecommandedBooksDto } from '@app/modules/book-recommandation/dto/get-recommended-books.dto';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosError } from 'axios';
import * as numeric from 'numeric';
import { catchError, map } from 'rxjs';

@Injectable()
export class BookRecommandationService
  implements IBookRecommandationService
{
  @Inject(HttpService)
  private readonly httpService: HttpService;

  @Inject(ConfigService)
  private configService: ConfigService;

  private bookData: IBookData[] = [];

  async getRecommendations(
    query: string[],
  ): Promise<GetRecommandedBooksDto[]> {
    await this.loadBookData();

    const queryEmbedding = await this.getQueryEmbedding(query);

    const distancesWithIndices = this.bookData.map((book, index) => {
      const embedding = book.embedding;

      return {
        index,
        distance: 1 - this.cosineSimilarity(queryEmbedding, embedding),
      };
    });

    distancesWithIndices.sort((a, b) => a.distance - b.distance);

    const kNearestNeighborsIndices = distancesWithIndices
      .slice(0, 10)
      .map((item) => item.index);

    return kNearestNeighborsIndices.map((index) => ({
      title: this.bookData[index].book_name,
      genre: this.bookData[index].genre,
      summary: this.bookData[index].summary,
    }));
  }

  private async loadBookData() {
    const url = this.configService.get<string>(
      envConstants.BookRecommandtionModule
        .RECOMMANDATION_BOOK_DATASET_FROM_AZURE,
    );

    this.httpService
      .get(url as string)
      .pipe(
        map((response) => response.data),
        map((data) => {
          const rawData = data.trim();
          const jsonObjects = rawData.match(/({.*?})/g);

          if (jsonObjects) {
            for (const jsonObject of jsonObjects) {
              const parsedData = JSON.parse(
                jsonObject as string,
              ) as IBookData;
              this.bookData.push(parsedData);
            }
          }
        }),
        catchError((error: AxiosError) => {
          throw error;
        }),
      )
      .subscribe();
  }

  private async getQueryEmbedding(query: string[]): Promise<number[]> {
    const endpoint = this.configService.get<string>(
      envConstants.BookRecommandtionModule.AZURE_ENDPOINT,
    );
    const azureApiKey = this.configService.get(
      envConstants.BookRecommandtionModule.AZURE_API_KEY,
    );
    const deploymentName = this.configService.get(
      envConstants.BookRecommandtionModule
        .AZURE_TEXT_EMBEDDING_DEPLOYMENT_NAME,
    );
    const client = new OpenAIClient(
      endpoint as string,
      new AzureKeyCredential(azureApiKey as string),
    );
    const embeddings = await client.getEmbeddings(
      deploymentName as string,
      query,
    );

    return embeddings.data[0].embedding;
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = numeric.dot(vecA, vecB);
    const normA = Math.sqrt(numeric.dot(vecA, vecA) as number);
    const normB = Math.sqrt(numeric.dot(vecB, vecB) as number);

    return dotProduct / (normA * normB);
  }
}
