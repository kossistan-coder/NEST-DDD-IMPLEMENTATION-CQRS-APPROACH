import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelsJournalProviders } from './models';
import { JournalRepository } from './repositories/journal.repository';
import { WinstonLoggerService } from './services/WinstonLogger';
import { JOURNAL_DATABASE_CONNECTION_NAME, LibCoreModule } from '@app/lib-core';

@Module({
  imports: [
    LibCoreModule,
    MongooseModule.forFeature(
      ModelsJournalProviders,
      JOURNAL_DATABASE_CONNECTION_NAME,
    ),
  ],
  providers: [JournalRepository, WinstonLoggerService],
  exports: [JournalRepository, WinstonLoggerService],
})
export class LibJournalInfrastructureModule { }
