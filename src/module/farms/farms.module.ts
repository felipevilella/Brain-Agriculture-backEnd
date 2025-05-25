import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Crops } from "src/infra/entities/crops.entity";
import { Farms } from "src/infra/entities/farms.entity";
import { Harvests } from "src/infra/entities/havests.entity";
import { Producers } from "src/infra/entities/producers.entity";
import { FarmUseCaseProxyModule } from "src/infra/usecase-proxy/farm-usecase-proxy.module";

import { FarmController } from "./farms.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Farms, Crops, Harvests, Producers]),
    FarmUseCaseProxyModule.register(),
  ],
  controllers: [FarmController],
})
export class FarmModule {}
