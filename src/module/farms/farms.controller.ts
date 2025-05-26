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


@Controller("farm")
export class FarmController {
  constructor(
    @Inject(FarmUseCaseProxyModule.CREATE_FARM_SERVICE)
    private readonly createFarmService: UseCaseProxy<CreateFarmService>,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() farm: CreateFarmDto) {
    logInfoInput(farm)
    return await this.createFarmService.getInstance().execute(farm);
  }
}
