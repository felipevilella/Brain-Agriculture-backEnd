import { BadRequestException } from "@nestjs/common";
import { Decimal } from "decimal.js";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { ProducersRepository } from "src/infra/repositories/producers.repository";


import { FarmMapper } from "../mapper/farms.mapper";
import { CreateFarmDto, IFarmDto, IFarmMapper } from "src/infra/definitions/dtos/farms.dto";

export class CreateFarmService {
  constructor(
    private readonly farmRepository: FarmsRepository,
    private readonly producersRepository: ProducersRepository
  ) {}

  private validateFarmAreaUsage(
    totalArea: number,
    arableArea: number,
    vegetationArea: number
  ): void {
    const total = new Decimal(totalArea);
    const usedArea = new Decimal(arableArea).plus(vegetationArea);

    if (usedArea.gt(total)) {
      throw new BadRequestException(
        "The sum of arable and vegetation areas exceeds the total area."
      );
    }
  }

  private async createFarm(farm: CreateFarmDto): Promise<IFarmDto> {
    const { totalArea, arableArea, vegetationArea } = farm;
    this.validateFarmAreaUsage(totalArea, arableArea, vegetationArea);

    const createdFarm = await this.farmRepository.createFarm(farm);

    return createdFarm;
  }

  async execute(farm: CreateFarmDto): Promise<IFarmMapper> {
    const existingProducer = await this.producersRepository.getProducerById(farm.producerId);

    if (!existingProducer) {
      throw new BadRequestException(`Producer ${farm.producerId} not found.`);
    }

    const farmMapper = await this.createFarm(farm);

    return FarmMapper.toDTO(farmMapper);
  }
}
