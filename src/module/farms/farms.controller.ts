import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FarmUseCaseProxyModule } from "src/infra/usecase-proxy/farm-usecase-proxy.module";
import { UseCaseProxy } from "src/infra/usecase-proxy/usecase-proxy";

import { CreateFarmService } from "./services/createFarm.services";
import { CreateFarmDto } from "src/infra/definitions/dtos/farms.dto";
import { logInfoInput } from "src/infra/helpers/logInfo";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Farm")
@Controller("farm")
export class FarmController {
  constructor(
    @Inject(FarmUseCaseProxyModule.CREATE_FARM_SERVICE)
    private readonly createFarmService: UseCaseProxy<CreateFarmService>
  ) {}

  @ApiOperation({ summary: "Create a new producer" })
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
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() farm: CreateFarmDto) {
    logInfoInput(farm);
    return await this.createFarmService.getInstance().execute(farm);
  }
}
