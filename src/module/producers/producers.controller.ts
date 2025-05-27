import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@ApiTags("Producer")
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
  @ApiOperation({ summary: "Create a new producer" })
  @ApiResponse({ status: 201, description: "Producer created successfully." })
  @ApiBadRequestResponse({
    description:
      "Bad Request - Possible reasons:\n" +
      "- The document is already in use\n" +
      "- Invalid CPF format\n" +
      "- Producer ${id} not found\n" +
      "- Invalid CNPJ format",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @ApiBody({ type: CreateProducerDto })
  async create(@Body() producer: CreateProducerDto) {
    logInfoInput(producer);
    return await this.createProducerService.getInstance().execute(producer);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: "Update an existing producer" })
  @ApiResponse({ status: 200, description: "Producer updated successfully." })
  @ApiBadRequestResponse({
    description:
      "Bad Request - Possible reasons:\n" +
      "- The document is already in use\n" +
      "- Invalid CPF format\n" +
      "- Invalid CNPJ format\n" +
      "- Producer ${id} not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @ApiParam({ name: "id", required: true, description: "Producer ID" })
  @ApiBody({ type: UpdateProducerDto })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() producer: UpdateProducerDto) {
    logInfoInput(producer);
    return await this.createProducerService.getInstance().execute(producer, id);
  }

  @Delete(":id")
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: "Delete a producer" })
  @ApiResponse({ status: 204, description: "Producer deleted successfully." })
  @ApiBadRequestResponse({
    description:
      "Bad Request - Possible reasons:\n" + "- Producer ${id} not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @ApiParam({ name: "id", required: true, description: "Producer ID" })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteProducerService.getInstance().execute(id);
  }

  @Get("/list")
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: "List all producers" })
  @ApiResponse({ status: 200, description: "Producers listed successfully." })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @ApiBadRequestResponse({
    description:
      "Bad Request - Possible reasons:\n" + "- Producer ${id} not found",
  })
  async list() {
    return await this.listProducerService.getInstance().execute();
  }
}
