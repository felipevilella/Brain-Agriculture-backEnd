import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule } from "src/infra/repositories/repositories.module";

import { FarmsRepository } from "../repositories/farms.repository";
import { ProducersRepository } from "../repositories/producers.repository";
import { UseCaseProxy } from "./usecase-proxy";
import { HarvestsRepository } from "../repositories/harvestsRepository";
import { CreateOrUpdateFarmService } from "src/module/farms/services/createOrUpdateFarm.services";
import { DeleteFarmService } from "src/module/farms/services/deleteFarm.service";

@Module({
  imports: [RepositoriesModule],
})
export class FarmUseCaseProxyModule {
  static CREATE_OR_UPDATE_FARM_SERVICE = "CreateOrUpdateFarmService";
  static DELETE_FARM_SERVICE = "DeleteFarmService";

  static register(): DynamicModule {
    return {
      module: FarmUseCaseProxyModule,
      providers: [
        {
          inject: [FarmsRepository, ProducersRepository, HarvestsRepository],
          provide: FarmUseCaseProxyModule.CREATE_OR_UPDATE_FARM_SERVICE,
          useFactory: (
            farmsRepository: FarmsRepository,
            producersRepository: ProducersRepository,
            harvestsRepository: HarvestsRepository
          ) =>
            new UseCaseProxy(
              new CreateOrUpdateFarmService(
                farmsRepository,
                producersRepository,
                harvestsRepository
              )
            ),
        },
        {
          inject: [FarmsRepository],
          provide: FarmUseCaseProxyModule.DELETE_FARM_SERVICE,
          useFactory: (farmsRepository: FarmsRepository) =>
            new UseCaseProxy(new DeleteFarmService(farmsRepository)),
        },
      ],
      exports: [
        FarmUseCaseProxyModule.CREATE_OR_UPDATE_FARM_SERVICE,
        FarmUseCaseProxyModule.DELETE_FARM_SERVICE,
      ],
    };
  }
}
