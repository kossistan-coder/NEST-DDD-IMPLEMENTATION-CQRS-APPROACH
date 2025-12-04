import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Journal } from '../models/journal';
import { BaseRepository } from '@app/lib-core/providers/base.mongo.repository';
import { JOURNAL_DATABASE_CONNECTION_NAME } from '@app/lib-core';


@Injectable()
export class JournalRepository extends BaseRepository<Journal> {
  constructor(
    @InjectModel(Journal.name, JOURNAL_DATABASE_CONNECTION_NAME)
    model: Model<Journal>,
  ) {
    super(model);
  }

  async getJournalPaginate(
    filter: Record<string, any> = {},
    limit = 20,
    skip = 0,
    sort: any,
  ): Promise<{
    documents: Record<string, any>[];
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

    const documents = await this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

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
