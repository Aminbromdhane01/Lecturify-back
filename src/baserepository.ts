import { DataSource, Repository, EntityTarget } from 'typeorm';

export abstract class AbstractGenericRepository<T> extends Repository<T> {
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

  async findOnebyId(alias: string, id: number): Promise<T> {
    const foundEntity = await this.createQueryBuilder(alias)
      .where('id = :id', { id })
      .getOne();
    return foundEntity;
  }
  async deleteItem(alias: string, id: number): Promise<number> {
    const deleteResult = await this.createQueryBuilder(alias)
      .delete()
      .where('id = :id', { id })
      .execute();
    return deleteResult.affected ?? 0;
  }
}
