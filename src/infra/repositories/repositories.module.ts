import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigModule } from "../database/typeorm/typeorm.module";
import { Crops } from "../entities/crops.entity";
import { Farms } from "../entities/farms.entity";
import { Harvests } from "../entities/havests.entity";
import { Producers } from "../entities/producers.entity";
import { FarmsRepository } from "./farms.repository";
import { ProducersRepository } from "./producers.repository";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Producers, Farms, Harvests, Crops]),
  ],
  providers: [ProducersRepository, FarmsRepository],
  exports: [ProducersRepository, FarmsRepository],
})
export class RepositoriesModule {}