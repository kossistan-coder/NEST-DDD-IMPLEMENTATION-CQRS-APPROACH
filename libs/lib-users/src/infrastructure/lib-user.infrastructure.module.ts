import { DynamicModule, Module } from "@nestjs/common";
import { LibUserDomainModule } from "../domain/lib-user.domain.module";

@Module({})
export class LibUserInfrastructureModule {
    static forRoot(): DynamicModule {
        return {
            module: LibUserInfrastructureModule,
            imports: [
                LibUserDomainModule.forRoot()
            ],
            providers: [],
            exports: []
        }
    }
}