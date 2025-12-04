import { Module } from "@nestjs/common";
import { DeleteJournalUseCase } from "./use-cases/delete-journal.use-case";
import { SaveJournalUseCase } from "./use-cases/save-journal.use-case";

@Module({
    imports: [LibJournalApplicationModule],
    providers: [
        SaveJournalUseCase,
        DeleteJournalUseCase
    ],
    exports: [
        SaveJournalUseCase,
        DeleteJournalUseCase
    ],
})
export class LibJournalApplicationModule { }