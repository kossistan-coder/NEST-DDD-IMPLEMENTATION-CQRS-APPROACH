import {
  ClientSession,
  CreateOptions,
  Document,
  Model,
  ObjectId,
  QueryOptions,
  RootFilterQuery,
  Schema,
  SortOrder,
  UpdateQuery,
} from 'mongoose';

export type FilterQuery<T> = RootFilterQuery<T>;
export type SortQuery<T> =
  | ({ [key in keyof Partial<T>]: SortOrder } & { [key: string]: SortOrder })
  | null;
export type SelectQuery<T> =
  | ({ [key in keyof Partial<T>]: 0 | 1 } & { [key: string]: 0 | 1 })
  | null;

// Corrigé ici : _id reste requis, Document est bien exclu
export type LeanedDocument<T> = Omit<T, keyof Document> & {
  _id: Schema.Types.ObjectId;
};

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(input: Partial<T>, options?: CreateOptions): Promise<LeanedDocument<T>>;
  async create(input: Partial<T>[], options?: CreateOptions): Promise<LeanedDocument<T>[]>;
  async create(
    input: Partial<T> | Partial<T>[],
    options?: CreateOptions,
  ): Promise<LeanedDocument<T> | LeanedDocument<T>[]> {
    const isArray = Array.isArray(input);
    const docs = await this.model.create(isArray ? input : [input], options);
    const leanedDocs = docs.map((doc) => doc.toObject() as LeanedDocument<T>);
    return isArray ? leanedDocs : leanedDocs[0];
  }

  update(
    update: UpdateQuery<T> & { _id: ObjectId | string },
    options: QueryOptions<T> = {},
    session?: ClientSession,
  ): Promise<LeanedDocument<T> | null> {
    // options = session ? { session, ...options } : options;

    options = session ? { session, ...options } : options;

    //@ts-expect-error nestjs
    return this.model
      .findOneAndUpdate({ _id: update._id }, update, {
        ...options,
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  upsert(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions<T> = {},
  ): Promise<LeanedDocument<T>> {
    return this.model
      .findOneAndUpdate(filter, update, {
        ...options,
        upsert: true,
        new: true,
        runValidators: true,
      })
      .lean()
      .exec() as Promise<LeanedDocument<T>>;
  }

  getById(id: ObjectId | string): Promise<LeanedDocument<T> | null> {
    return this.model.findById(id).lean().exec() as Promise<LeanedDocument<T> | null>;
  }

  deleteById(id: ObjectId | string): Promise<LeanedDocument<T> | null> {
    return this.model.findByIdAndDelete(id).lean().exec() as Promise<LeanedDocument<T> | null>;
  }

  getOne(
    filter: FilterQuery<T> = {},
    sort: SortQuery<T> = null,
    select: SelectQuery<T> = null,
  ): Promise<LeanedDocument<T> | null> {
    return this.model
      .findOne(filter)
      .sort(sort ?? {})
      .select(select ?? '')
      .lean()
      .exec() as Promise<LeanedDocument<T> | null>;
  }

  get(
    filter: FilterQuery<T> = {},
    limit = 20,
    skip = 0,
    sort: SortQuery<T> = null,
    select: SelectQuery<T> = null,
  ): Promise<LeanedDocument<T>[]> {
    return this.model
      .find(filter)
      .sort(sort ?? {})
      .skip(skip)
      .limit(limit)
      .select(select ?? '')
      .lean()
      .exec() as Promise<LeanedDocument<T>[]>;
  }

  getAll(
    filter: FilterQuery<T> = {},
    sort: SortQuery<T> = null,
    select: SelectQuery<T> = null,
  ): Promise<LeanedDocument<T>[]> {
    return this.get(filter, 0, 0, sort, select);
  }

  /**
   * Récupère une liste paginée avec infos complètes
   */
  async paginate(
    filter: FilterQuery<T> = {},
    limit = 10,
    skip = 0,
    sort: SortQuery<T> = null,
    select: SelectQuery<T> = null,
  ): Promise<{
    documents: LeanedDocument<T>[];
    pagination: {
      total: number;
      limit: number;
      skip: number;
      page: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const total = await this.model.countDocuments(filter);
    const documents =
      limit === 0
        ? []
        : ((await this.model
            .find(filter)
            .sort(sort ?? {})
            .skip(skip)
            .limit(limit)
            .select(select ?? '')
            .lean()
            .exec()) as LeanedDocument<T>[]);

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
}
