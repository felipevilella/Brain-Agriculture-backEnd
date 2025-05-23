import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigModule } from "../database/typeorm/typeorm.module";
import { Crops } from "../entities/crops.entity";
import { Farms } from "../entities/farms.entity";
import { Harvests } from "../entities/havests.entity";
import { Producers } from "../entities/producers.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Producers, Farms, Harvests, Crops]),
  ],
  providers: [],
  exports: [],
})
export class RepositoriesModule {}
