import { Module } from "@nestjs/common";
import { FarmUseCaseProxyModule } from "src/infra/usecase-proxy/farm-usecase-proxy.module";
import { ProducerUseCaseProxyModule } from "src/infra/usecase-proxy/producer-usecase-proxy.module";

import { EnvironmentConfigModule } from "../infra/database/config/environment-config.module";
import { TypeOrmConfigModule } from "../infra/database/typeorm/typeorm.module";
import { FarmController } from "./farms/farms.controller";
import { FarmModule } from "./farms/farms.module";
import { ProducerController } from "./producers/producers.controller";
import { ProducerModule } from "./producers/producers.module";
import { DashboardController } from "./dashboard/dashboard.controller";
import { DashboardUseCaseProxyModule } from "src/infra/usecase-proxy/dashboard-usecase-proxy.module";

@Module({
  imports: [
    ProducerModule,
    FarmModule,
    ProducerUseCaseProxyModule.register(),
    FarmUseCaseProxyModule.register(),
    DashboardUseCaseProxyModule.register(),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
  ],
  controllers: [
    ProducerController,
    FarmController,
    DashboardController
  ],
})
export class AppModule {}
