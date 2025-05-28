import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FarmUseCaseProxyModule } from "src/infra/usecase-proxy/farm-usecase-proxy.module";
import { UseCaseProxy } from "src/infra/usecase-proxy/usecase-proxy";

import {
  CreateFarmDto,
  UpdateFarmDTO,
} from "src/infra/definitions/dtos/farms.dto";
import { logInfoInput } from "src/infra/helpers/logInfo";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateOrUpdateFarmService } from "./services/createOrUpdateFarm.services";

@ApiTags("Farm")
@Controller("farm")
export class FarmController {
  constructor(
    @Inject(FarmUseCaseProxyModule.CREATE_OR_UPDATE_FARM_SERVICE)
    private readonly createOrUpdateFarmService: UseCaseProxy<CreateOrUpdateFarmService>
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new farm" })
  @ApiResponse({ status: 201, description: "Farm created successfully." })
  @ApiBadRequestResponse({
    description:
      "Bad Request - Possible reasons:\n" +
      "- Crops name should not be empty\n" +
      "- The sum of arable and vegetation areas exceeds the total area.\n" +
      "- Producer ${id} not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @ApiBody({ type: CreateFarmDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() farm: CreateFarmDto) {
    logInfoInput(farm);
    return await this.createOrUpdateFarmService.getInstance().execute(farm);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update farm" })
  @ApiResponse({ status: 200, description: "Farm updated successfully." })
  @ApiBadRequestResponse({
    description:
      "Bad Request - Possible reasons:\n" +
      "- Crops name should not be empty\n" +
      "- The sum of arable and vegetation areas exceeds the total area.\n" +
      "- farm ${id} not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: "id", required: true, description: "Producer ID" })
  @ApiBody({ type: UpdateFarmDTO })
  async update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() farm: UpdateFarmDTO
  ) {
    logInfoInput(farm);
    return await this.createOrUpdateFarmService.getInstance().execute(farm, id);
  }
}
