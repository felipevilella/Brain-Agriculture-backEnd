import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Crops } from "../entities/crops.entity";
import { ICropRepository } from "src/repositories/crop.repository.interface";
import { ITotalCropNameDto } from "../definitions/dtos/crop.dtos";
import { IHarvestsRepository } from "src/repositories/harvests.repository.interface";
import { Harvests } from "../entities/havests.entity";

@Injectable()
export class HarvestsRepository implements IHarvestsRepository {
  constructor(
    @InjectRepository(Harvests)
    private readonly harvestsRepository: Repository<Harvests>
  ) {}

  async deleteByFarmId(farmId: string): Promise<void> {
     await this.harvestsRepository.delete({farmId: farmId})
  }
}
