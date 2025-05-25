import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Producers } from "src/infra/entities/producers.entity";
import { ProducerUseCaseProxyModule } from "src/infra/usecase-proxy/producer-usecase-proxy.module";

import { ProducerController } from "./producers.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Producers]),
    ProducerUseCaseProxyModule.register(),
  ],
  controllers: [ProducerController],
})
export class ProducerModule {}
