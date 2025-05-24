import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UseCaseProxy } from "src/infra/usecase-proxy/usecase-proxy";
import { UseCaseProxyModule } from "src/infra/usecase-proxy/usecase-proxy.module";


import { CreateProducerDto, UpdateProducerDto } from "./dto/producers.dto";
import { CreateOrUpdateProducerService } from "./services/createOrUpdateProducer.services";

@Controller("producer")
export class ProducerController {
  constructor(
    @Inject(UseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER)
    private readonly createProducerService: UseCaseProxy<CreateOrUpdateProducerService>
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() producer: CreateProducerDto) {
    return await this.createProducerService.getInstance().execute(producer);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param("id") id: string,
    @Body() producer: UpdateProducerDto
  ) {
    return await this.createProducerService.getInstance().execute(producer, id);
  }
}
