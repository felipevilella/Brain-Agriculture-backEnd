import { Module } from "@nestjs/common";

import { EnvironmentConfigModule } from "../infra/database/config/environment-config.module";
import { TypeOrmConfigModule } from "../infra/database/typeorm/typeorm.module";
import { UseCaseProxyModule } from "../infra/usecase-proxy/usecase-proxy.module";
import { ProducerModule } from "./producers/producers.module";
import { ProducerController } from "./producers/producers.controller";

@Module({
  imports: [
    ProducerModule,
    UseCaseProxyModule.register(),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
  ],
  controllers: [
    ProducerController
  ],
})
export class AppModule {}
