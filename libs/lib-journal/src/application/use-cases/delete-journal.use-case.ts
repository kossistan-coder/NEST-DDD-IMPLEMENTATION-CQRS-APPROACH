import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JournalRepository } from "@app/lib-journal/infrastructure/repositories/journal.repository";
import { ErrorResult } from "@app/lib-core/utils/domain/result";
import { WinstonLoggerService } from "@app/lib-journal/infrastructure/services/WinstonLogger";

@Injectable()
export class DeleteJournalUseCase<T> {
    private readonly logger = new Logger(DeleteJournalUseCase.name);

    private readonly isEnabled: boolean = false;

    constructor(
        private readonly config: ConfigService<T, true>,
        private readonly journalRepository: JournalRepository,
        private readonly winstonLoggerService: WinstonLoggerService,
    ) {
        this.isEnabled = this.config.get<T>('LIB_JOURNAL_ENABLED', { infer: true }) === "true" ? true : false;
    }

    async execute(id: string) {
        const line = await this.journalRepository.getById(id);
        if (!line) {
            throw new ErrorResult({
                code: 404_007,
                clean_message: "L'entrée de journal est introuvable",
                message: `L'entrée de journal [${id}] est introuvable`,
            });
        }

        line.active = false;
        line.deleted = true;
        line.deletedAt = new Date();

        await this.journalRepository.update(line);
    }
}