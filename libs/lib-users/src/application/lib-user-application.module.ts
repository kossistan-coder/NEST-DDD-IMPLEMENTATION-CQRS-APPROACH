import { Module } from "@nestjs/common";
import { LibUserInfrastructureModule } from "../infrastructure/lib-user.infrastructure.module";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { LibJournalModule } from "@app/lib-journal";

@Module({
    imports: [
        LibJournalModule,
        LibUserInfrastructureModule
    ],
    providers: [
        CreateUserUseCase
    ],
    exports: [
        CreateUserUseCase,
        LibUserInfrastructureModule
    ]
})
export class LibUserApplicationModule {

}