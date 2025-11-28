import { DynamicModule, Module } from "@nestjs/common";
import { LibUserDomainModule } from "../domain/lib-user.domain.module";
import { UserRepository } from "./repositories/user.repository";

@Module({})
export class LibUserInfrastructureModule {
    static forRoot(): DynamicModule {
        return {
            module: LibUserInfrastructureModule,
            imports: [
                LibUserDomainModule.forRoot()
            ],
            providers: [UserRepository],
            exports: [UserRepository]
        }
    }
}