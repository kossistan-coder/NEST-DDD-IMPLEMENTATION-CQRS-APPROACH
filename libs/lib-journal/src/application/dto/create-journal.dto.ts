import { AppLogLevel } from "@app/lib-core/types";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateJournalDto {
    @IsNotEmpty()
    @IsString()
    moduleName: string;

    @IsNotEmpty()
    @IsString()
    className: string;

    @IsNotEmpty()
    @IsString()
    level: AppLogLevel = 'error';

    @IsNotEmpty()
    @IsString()
    message: string = '';

    @IsNotEmpty()
    @IsString()
    data: Record<string, any> = {};

}