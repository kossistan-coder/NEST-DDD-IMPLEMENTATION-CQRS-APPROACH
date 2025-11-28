import { Module } from "@nestjs/common";
import { LibUserInfrastructureModule } from "../infrastructure/lib-user.infrastructure.module";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";

@Module({
    imports: [
        LibUserInfrastructureModule.forRoot()
    ],
    providers: [
        CreateUserUseCase
    ],
    exports: [
        CreateUserUseCase
    ]
})
export class LibUserApplicationModule {

}