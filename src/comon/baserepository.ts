import type { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { Repository } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractGenericRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  constructor(
    private readonly dataSource: DataSource,
    entity: EntityTarget<T>,
  ) {
    super(entity, dataSource.createEntityManager());
  }

  async findAll(
    alias: string,
    params: {
      itemsPerPage: number;
      page: number;
      keyword: string;
    },
  ): Promise<{ data: T[]; count: number }> {
    const { itemsPerPage, page } = params;
    const [data, count] = await this.createQueryBuilder(alias)
      .skip(page * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { data, count };
  }

  async findOnebyId(alias: string, id: number): Promise<T | null> {
    return this.createQueryBuilder(alias)
      .where('id = :id', { id })
      .getOne();
  }

  async deleteItem(alias: string, id: number): Promise<number> {
    const deleteResult = await this.createQueryBuilder(alias)
      .delete()
      .where('id = :id', { id })
      .execute();

    return deleteResult.affected ?? 0;
  }

  async createItem(alias: string, item: Partial<T>): Promise<T> {
    const newItem = await this.createQueryBuilder(alias)
      .insert()
      .values(item as QueryDeepPartialEntity<T>)
      .execute();

    return newItem.raw;
  }

  async updateItem(
    alias: string,
    id: number,
    item: Partial<T>,
  ): Promise<T | null> {
    await this.createQueryBuilder(alias)
      .update()
      .set(item as QueryDeepPartialEntity<T>)
      .where('id = :id', { id })
      .execute();

    return this.findOnebyId(alias, id);
  }
}
