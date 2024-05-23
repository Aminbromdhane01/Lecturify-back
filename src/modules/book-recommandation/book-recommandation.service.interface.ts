import type { GetRecommandedBooksDto } from '@app/modules/book-recommandation/dto/get-recommended-books.dto';
export const BOOK_RECOMMANDATION_SERVIVE = 'BOOK_RECOMMANDATION_SERVIVE';
export interface IBookRecommandationService {
  getRecommendations(query: string[]): Promise<GetRecommandedBooksDto[]>;
}
