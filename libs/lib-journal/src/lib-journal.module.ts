import { Module } from '@nestjs/common';
import { LibJournalApplicationModule } from './application/lib-journal-application.module';

@Module({
  imports: [
    LibJournalApplicationModule
  ],
  providers: [

  ],
  exports: [LibJournalApplicationModule],
})
export class LibJournalModule { }
