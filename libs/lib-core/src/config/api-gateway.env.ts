import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
    validateSync,
} from 'class-validator';
import { AppEnvironment } from '../types';
import { plainToInstance, Transform, Type } from 'class-transformer';

export class ApiGatewayAppConfig {

    @IsEnum(AppEnvironment)
    NODE_ENV: AppEnvironment;

    @Transform(({ value }) => parseInt(value))
    PORT_GATEWAY: number

    @Transform(({ value }) => parseInt(value))
    PORT_USER: number

    @Transform(({ value }) => parseInt(value))
    PORT_AUTH: number

    @Transform(({ value }) => parseInt(value))
    PORT_PAYMENT: number

    @IsString()
    USER_SERVICE_HOST: string

    @IsString()
    AUTH_SERVICE_HOST: string

    @IsString()
    PAYMENT_SERVICE_HOST: string

    @Transform(({ value }) => value === 'true')
    LIB_JOURNAL_ENABLED: boolean

    @IsString()
    LOGS_DIRECTORY: string

}

export function validateUserAppConfig(payload: Record<string, any>) {
    const config = plainToInstance(ApiGatewayAppConfig, payload, {
        exposeDefaultValues: true,
    });

    const errors = validateSync(config, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        const message = errors
            .map((e) =>
                Object.values(e.constraints || {})
                    .map((msg) => `- ${msg}`)
                    .join('\n'),
            )
            .join('\n');

        throw new Error(
            `${ApiGatewayAppConfig.name} environment variables validation failed\n${message}`,
        );
    }

    return config;
}
