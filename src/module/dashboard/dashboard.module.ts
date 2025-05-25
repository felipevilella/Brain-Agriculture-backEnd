import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Crops } from "src/infra/entities/crops.entity";
import { Farms } from "src/infra/entities/farms.entity";
import { DashboardController } from "./dashboard.controller";
import { DashboardUseCaseProxyModule } from "src/infra/usecase-proxy/dashboard-usecase-proxy.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([Farms, Crops]),
    DashboardUseCaseProxyModule.register(),
  ],
  controllers: [DashboardController],
})
export class DashboardModule {}
