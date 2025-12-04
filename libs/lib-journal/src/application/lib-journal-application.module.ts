import { Module } from "@nestjs/common";
import { DeleteJournalUseCase } from "./use-cases/delete-journal.use-case";
import { SaveJournalUseCase } from "./use-cases/save-journal.use-case";
import { LibJournalInfrastructureModule } from "../infrastructure/lib-infrastructure.module";

@Module({
    imports: [LibJournalInfrastructureModule],
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