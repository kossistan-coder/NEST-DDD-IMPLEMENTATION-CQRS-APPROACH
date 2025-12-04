import { DynamicModule, Module } from "@nestjs/common";
import { LibUserDomainModule } from "../domain/lib-user.domain.module";
import { UserRepository } from "./repositories/user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDocument, UserSchema } from "./documents/user.document";
import { LibCoreModule, MAIN_DATABASE_CONNECTION_NAME } from "@app/lib-core";

@Module({
    imports: [
        LibCoreModule,
        LibUserDomainModule,
        MongooseModule.forFeature([
            { name: UserDocument.name, schema: UserSchema }
        ], MAIN_DATABASE_CONNECTION_NAME)
    ],
    providers: [UserRepository],
    exports: [UserRepository, MongooseModule]
})
export class LibUserInfrastructureModule {

}