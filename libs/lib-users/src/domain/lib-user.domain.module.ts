import { DynamicModule, Module } from "@nestjs/common";
import { UserDomainService } from "./services/user-domain.service";

@Module({})
export class LibUserDomainModule {
    // Parfois on met un static forRoot() si on a besoin de config
    static forRoot(): DynamicModule {
        return {
            module: UserDomainService,
            providers: [UserDomainService],
            exports: [UserDomainService],
        };
    }
}