import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProducerUseCaseProxyModule } from "src/infra/usecase-proxy/producer-usecase-proxy.module";
import { UseCaseProxy } from "src/infra/usecase-proxy/usecase-proxy";

import { CreateProducerDto, UpdateProducerDto } from "./dto/producers.dto";
import { CreateOrUpdateProducerService } from "./services/createOrUpdateProducer.services";
import { DeleteProducerService } from "./services/deleteProducer.service";
import { ListProducerService } from "./services/ListProducers.service";

@Controller("producer")
export class ProducerController {
  constructor(
    @Inject(ProducerUseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER)
    private readonly createProducerService: UseCaseProxy<CreateOrUpdateProducerService>,
    @Inject(ProducerUseCaseProxyModule.DELETE_PRODUCER)
    private readonly deleteProducerService: UseCaseProxy<DeleteProducerService>,
    @Inject(ProducerUseCaseProxyModule.LIST_PRODUCER)
    private readonly listProducerService: UseCaseProxy<ListProducerService>
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() producer: CreateProducerDto) {
    return await this.createProducerService.getInstance().execute(producer);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param("id") id: string, @Body() producer: UpdateProducerDto) {
    return await this.createProducerService.getInstance().execute(producer, id);
  }

  @Delete(":id")
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(@Param("id") id: string) {
    return await this.deleteProducerService.getInstance().execute(id);
  }

  @Get("/list")
  @UsePipes(new ValidationPipe({ transform: true }))
  async list() {
    return await this.listProducerService.getInstance().execute();
  }
}
