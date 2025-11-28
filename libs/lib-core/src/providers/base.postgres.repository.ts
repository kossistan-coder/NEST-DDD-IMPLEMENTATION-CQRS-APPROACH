import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

export interface PaginationResult<T> {
  documents: T[];
  pagination: {
    total: number;
    limit: number;
    skip: number;
    page: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export abstract class BasePostgresRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async exists(id: string): Promise<boolean>;
  async exists(filter: FindOptionsWhere<T>): Promise<boolean>;
  async exists(idOrFilter: string | FindOptionsWhere<T>): Promise<boolean> {
    const where =
      typeof idOrFilter === 'string'
        ? ({ id: idOrFilter } as unknown as FindOptionsWhere<T>)
        : idOrFilter;

    const count = await this.repository.count({ where });
    return count > 0;
  }

  async create(input: DeepPartial<T>): Promise<T>;
  async create(input: DeepPartial<T>[]): Promise<T[]>;
  async create(input: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]> {
    const isArray = Array.isArray(input);
    const entities = this.repository.create(isArray ? input : [input]);
    const saved = await this.repository.save(entities as DeepPartial<T>[]);
    return isArray ? saved : saved[0];
  }

  async update(id: string, update: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, update as any);
    return this.getById(id);
  }

  async upsert(filter: FindOptionsWhere<T>, update: DeepPartial<T>): Promise<T> {
    const existing = await this.getOne(filter);
    if (existing) {
      await this.repository.update(filter, update as any);
      return this.getOne(filter) as Promise<T>;
    }
    return this.create({
      ...filter,
      ...update,
    } as DeepPartial<T>) as Promise<T>;
  }

  async getById(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  async deleteById(id: string): Promise<T | null> {
    const entity = await this.getById(id);
    if (entity) {
      await this.repository.delete(id);
    }
    return entity;
  }

  async getOne(
    filter: FindOptionsWhere<T> = {} as FindOptionsWhere<T>,
    order?: FindManyOptions<T>['order'],
    select?: FindManyOptions<T>['select'],
  ): Promise<T | null> {
    return this.repository.findOne({
      where: filter,
      order,
      select,
    });
  }

  async get(
    filter: FindOptionsWhere<T> = {} as FindOptionsWhere<T>,
    limit = 20,
    skip = 0,
    order?: FindManyOptions<T>['order'],
    select?: FindManyOptions<T>['select'],
  ): Promise<T[]> {
    return this.repository.find({
      where: filter,
      take: limit,
      skip,
      order,
      select,
    });
  }

  async paginate(
    filter: FindOptionsWhere<T> = {} as FindOptionsWhere<T>,
    limit = 20,
    skip = 0,
    order?: FindManyOptions<T>['order'],
    select?: FindManyOptions<T>['select'],
  ): Promise<PaginationResult<T>> {
    const [documents, total] = await this.repository.findAndCount({
      where: filter,
      take: limit,
      skip,
      order,
      select,
    });

    const page = limit > 0 ? Math.floor(skip / limit) + 1 : 1;
    const pages = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      documents,
      pagination: {
        total,
        limit,
        skip,
        page,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    };
  }

  async getAll(
    filter: FindOptionsWhere<T> = {} as FindOptionsWhere<T>,
    order?: FindManyOptions<T>['order'],
    select?: FindManyOptions<T>['select'],
  ): Promise<T[]> {
    return this.repository.find({
      where: filter,
      order,
      select,
    });
  }
}
