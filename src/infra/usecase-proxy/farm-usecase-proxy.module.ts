import { DynamicModule,Module } from "@nestjs/common";
import { RepositoriesModule } from "src/infra/repositories/repositories.module";
import { CreateFarmService } from "src/module/farms/services/createFarm.services";

import { FarmsRepository } from "../repositories/farms.repository";
import { ProducersRepository } from "../repositories/producers.repository";
import { UseCaseProxy } from "./usecase-proxy";

@Module({
  imports: [RepositoriesModule],
})
export class FarmUseCaseProxyModule {
  static CREATE_FARM = "CreateFarmService";

  static register(): DynamicModule {
    return {
      module: FarmUseCaseProxyModule,
      providers: [
        {
          inject: [FarmsRepository, ProducersRepository],
          provide: FarmUseCaseProxyModule.CREATE_FARM,
          useFactory: (farmsRepository: FarmsRepository, producersRepository: ProducersRepository) =>
            new UseCaseProxy(
              new CreateFarmService(farmsRepository, producersRepository),
            ),
        },
      ],
      exports: [
        FarmUseCaseProxyModule.CREATE_FARM
      ],
    };
  }
}
