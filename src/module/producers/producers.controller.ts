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

import { CreateOrUpdateProducerService } from "./services/createOrUpdateProducer.services";
import { DeleteProducerService } from "./services/deleteProducer.service";
import {
  CreateProducerDto,
  UpdateProducerDto,
} from "src/infra/definitions/dtos/producers.dto";
import { logInfoInput } from "src/infra/helpers/logInfo";
import { ListProducerService } from "./services/listProducers.service";

@Controller("producer")
export class ProducerController {
  constructor(
    @Inject(ProducerUseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER_SERVICE)
    private readonly createProducerService: UseCaseProxy<CreateOrUpdateProducerService>,
    @Inject(ProducerUseCaseProxyModule.DELETE_PRODUCER_SERVICE)
    private readonly deleteProducerService: UseCaseProxy<DeleteProducerService>,
    @Inject(ProducerUseCaseProxyModule.LIST_PRODUCER_SERVICE)
    private readonly listProducerService: UseCaseProxy<ListProducerService>
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() producer: CreateProducerDto) {
    logInfoInput(producer);
    return await this.createProducerService.getInstance().execute(producer);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param("id") id: string, @Body() producer: UpdateProducerDto) {
    logInfoInput(producer);
    return await this.createProducerService.getInstance().execute(producer, id);
  }

  @Delete(":id")
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(@Param("id") id: string) {
    return await this.deleteProducerService.getInstance().execute(id);
  }

  @Get("/list")
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async list() {
    return await this.listProducerService.getInstance().execute();
  }
}
