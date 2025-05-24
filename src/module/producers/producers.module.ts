import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Producers } from "src/infra/entities/producers.entity";

import { UseCaseProxyModule } from "src/infra/usecase-proxy/usecase-proxy.module";
import { ProducerController } from "./producers.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Producers]),
    UseCaseProxyModule.register(),
  ],
  controllers: [ProducerController],
})
export class ProducerModule {}
