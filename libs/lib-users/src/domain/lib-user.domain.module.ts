import { DynamicModule, Module } from "@nestjs/common";
import { UserWalletService } from "./services/user-wallet.service";

@Module({})
export class LibUserDomainModule {
    // Parfois on met un static forRoot() si on a besoin de config
    static forRoot(): DynamicModule {
        return {
            module: LibUserDomainModule,
            providers: [UserWalletService],
            exports: [UserWalletService],
        };
    }
}