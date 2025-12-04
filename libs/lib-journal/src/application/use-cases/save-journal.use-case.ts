import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

import { JournalRepository } from '../../infrastructure/repositories/journal.repository';
import { AppLogLevel } from '@app/lib-core/types';
import { ErrorResult } from '@app/lib-core/utils/domain/result';
import { WinstonLoggerService } from '@app/lib-journal/infrastructure/services/WinstonLogger';
import { level } from 'winston';
import { CreateJournalDto } from '../dto/create-journal.dto';


@Injectable()
export class SaveJournalUseCase<T> {
    private readonly logger = new Logger(SaveJournalUseCase.name);

    private readonly isEnabled: boolean = false;

    constructor(
        private readonly config: ConfigService<T, true>,
        private readonly journalRepository: JournalRepository,
        private readonly winstonLoggerService: WinstonLoggerService,
    ) {
        this.isEnabled = this.config.get<T>('LIB_JOURNAL_ENABLED', { infer: true }) === "true" ? true : false;
    }

    async execute(
        createJournalDto: CreateJournalDto
    ) {

        const { moduleName, className, level, message, data } = createJournalDto;
        if (!this.isEnabled) return null;

        const msg = `${level.toUpperCase()} [${moduleName}/${className}] ${message}`;
        const logData: Record<string, any> = { moduleName, className };

        // Traitement des erreurs spécifiques
        if (data instanceof AxiosError) {
            if (data.response?.data) {
                Object.assign(logData, data.response.data);
            }
        } else if (data instanceof Error) {
            Object.assign(logData, {
                name: data.name ?? '',
                message: data.message ?? '',
                stack: data.stack ?? '',
            });
        } else {
            // Fusion des données supplémentaires pour les objets normaux
            Object.assign(logData, data);
        }

        try {
            // Journalisation conditionnelle
            if (level === 'error') {
                // Erreurs -> Winston uniquement
                this.winstonLoggerService.error(msg, JSON.stringify(logData));
            } else {
                // Autres niveaux (info) -> Base de données uniquement
                return await this.journalRepository.create({
                    level,
                    message: msg,
                    data: logData,
                });
            }
        } catch (error) {
            this.logger.error('[JOURNAL SERVICE] Logging failed', error);
        }
    }


}
