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

export class UserAppConfig {

    @IsEnum(AppEnvironment)
    NODE_ENV: AppEnvironment;


    @IsString()
    @IsNotEmpty()
    USER_MAIN_DATABASE_URI: string;


    @IsString()
    @IsNotEmpty()
    PORT_USER: string;

}

export function validateUserAppConfig(payload: Record<string, any>) {
    const config = plainToInstance(UserAppConfig, payload, {
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
            `${UserAppConfig.name} environment variables validation failed\n${message}`,
        );
    }

    return config;
}
