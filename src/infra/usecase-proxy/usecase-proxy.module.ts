import { type DynamicModule, Module } from "@nestjs/common";

import { EnvironmentConfigModule } from "../database/config/environment-config.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { ProducersRepository } from "../repositories/producers.repository";
import { UseCaseProxy } from "./usecase-proxy";
import { CreateOrUpdateProducerService } from "src/module/producers/services/createOrUpdateProducer.services";


@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UseCaseProxyModule {
  static CREATE_OR_UPDATE_PRODUCER = "CreateOrUpdateProducerService";

  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [   {
          inject: [ProducersRepository],
          provide: UseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER,
          useFactory: (producersRepository: ProducersRepository) =>
            new UseCaseProxy(new CreateOrUpdateProducerService(producersRepository)),
        },],
      exports: [UseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER],
    };
  }
}
