import { BadRequestException } from "@nestjs/common";
import { Decimal } from "decimal.js";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { ProducersRepository } from "src/infra/repositories/producers.repository";

import { FarmMapper } from "../mapper/farms.mapper";
import {
  CreateFarmDto,
  IFarmDto,
  IFarmMapper,
  UpdateFarmDTO,
} from "src/infra/definitions/dtos/farms.dto";
import { logErrorObject, logInfoObject } from "src/infra/helpers/logInfo";
import { HarvestsRepository } from "src/infra/repositories/harvestsRepository";
export class CreateOrUpdateFarmService {
  constructor(
    private readonly farmRepository: FarmsRepository,
    private readonly producersRepository: ProducersRepository,
    private readonly harvestsRepository: HarvestsRepository
  ) {}

  private validateFarmAreaUsage(
    totalArea: number,
    arableArea: number,
    vegetationArea: number
  ): void {
    const total = new Decimal(totalArea);
    const usedArea = new Decimal(arableArea).plus(vegetationArea);

    if (usedArea.gt(total)) {
      logErrorObject("FarmService - AreaValidationError", {
        totalArea,
        arableArea,
        vegetationArea,
      });
      throw new BadRequestException(
        "The sum of arable and vegetation areas exceeds the total area."
      );
    }
  }

  private async validateProducerExists(producerId: string): Promise<void> {
    const producer = await this.producersRepository.getProducerById(producerId);
    if (!producer) {
      logErrorObject("FarmService - ProducerNotFound", { producerId });
      throw new BadRequestException(`Producer ${producerId} not found.`);
    }
  }

  private async createFarm(farmDto: CreateFarmDto): Promise<IFarmDto> {
    await this.validateProducerExists(farmDto.producerId);
    this.validateFarmAreaUsage(
      farmDto.totalArea,
      farmDto.arableArea,
      farmDto.vegetationArea
    );

    const createdFarm = await this.farmRepository.createFarm(farmDto);

    logInfoObject("FarmService - FarmCreated", { farmId: createdFarm.id });

    return createdFarm;
  }

  private async updateFarm(
    id: string,
    farmDto: UpdateFarmDTO
  ): Promise<IFarmDto> {
    const existingFarm = await this.farmRepository.getFarmById(id);

    if (!existingFarm) {
      logErrorObject("FarmService - FarmNotFound", { farmId: id });
      throw new BadRequestException(`Farm ${id} not found.`);
    }

    this.validateFarmAreaUsage(
      farmDto.totalArea ?? existingFarm.totalArea,
      farmDto.arableArea ?? existingFarm.arableArea,
      farmDto.vegetationArea ?? existingFarm.vegetationArea
    );

    await this.harvestsRepository.deleteByFarmId(id);
    await this.farmRepository.updateFarm(id, farmDto);

    const updatedFarm = await this.farmRepository.getFarmById(id);
    

    logInfoObject("FarmService - FarmUpdated", updatedFarm);

    return updatedFarm;
  }

  async execute(
    farmDto: CreateFarmDto | UpdateFarmDTO,
    id?: string
  ): Promise<IFarmMapper> {
    const farm = id
      ? await this.updateFarm(id, farmDto)
      : await this.createFarm(farmDto as CreateFarmDto);

    return FarmMapper.toDTO(farm);
  }
}
