import { DynamicModule,Module } from "@nestjs/common";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { RepositoriesModule } from "src/infra/repositories/repositories.module";
import { CreateOrUpdateProducerService } from "src/module/producers/services/createOrUpdateProducer.services";
import { DeleteProducerService } from "src/module/producers/services/deleteProducer.service";
import { ListProducerService } from "src/module/producers/services/listProducers.service";

import { UseCaseProxy } from "./usecase-proxy";

@Module({
  imports: [RepositoriesModule],
})
export class ProducerUseCaseProxyModule {
  static CREATE_OR_UPDATE_PRODUCER_SERVICE = "CreateOrUpdateProducerService";

  static DELETE_PRODUCER_SERVICE = "DeleteProducerService";

  static LIST_PRODUCER_SERVICE = "ListProducerService";

  static register(): DynamicModule {
    return {
      module: ProducerUseCaseProxyModule,
      providers: [
        {
          inject: [ProducersRepository],
          provide: ProducerUseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER_SERVICE,
          useFactory: (producersRepository: ProducersRepository) =>
            new UseCaseProxy(
              new CreateOrUpdateProducerService(producersRepository),
            ),
        },
        {
          inject: [ProducersRepository],
          provide: ProducerUseCaseProxyModule.DELETE_PRODUCER_SERVICE,
          useFactory: (producersRepository: ProducersRepository) =>
            new UseCaseProxy(
              new DeleteProducerService(producersRepository),
            ),
        },
        {
          inject: [ProducersRepository],
          provide: ProducerUseCaseProxyModule.LIST_PRODUCER_SERVICE,
          useFactory: (producersRepository: ProducersRepository) =>
            new UseCaseProxy(
              new ListProducerService(producersRepository),
            ),
        },
      ],
      exports: [
        ProducerUseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER_SERVICE,
        ProducerUseCaseProxyModule.DELETE_PRODUCER_SERVICE,
        ProducerUseCaseProxyModule.LIST_PRODUCER_SERVICE,
      ],
    };
  }
}
