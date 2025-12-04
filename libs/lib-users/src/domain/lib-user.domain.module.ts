import { DynamicModule, Module } from "@nestjs/common";
import { UserWalletService } from "./services/user-wallet.service";

@Module({
    providers: [UserWalletService],
    exports: [UserWalletService],
})
export class LibUserDomainModule {

}