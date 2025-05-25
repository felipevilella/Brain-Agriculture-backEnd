import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { IFarmsRepository } from "src/repositories/farms.repository.interface";
import { Repository } from "typeorm";

import { Crops } from "../entities/crops.entity";
import { Farms } from "../entities/farms.entity";
import { Harvests } from "../entities/havests.entity";
import {
  CreateFarmDto,
  IFarmDto,
  ITotalFarmByStateDto,
} from "../definitions/dtos/farms.dto";
import { ICropRepository } from "src/repositories/crop.repository.interface";
import { ITotalCropNameDto } from "../definitions/dtos/crop.dtos";

@Injectable()
export class CropRepository implements ICropRepository {
  constructor(
    @InjectRepository(Farms)
    private readonly farmsRepository: Repository<Farms>
  ) {}

  async getTotalCropByName(): Promise<ITotalCropNameDto[]> {
    const crop = await this.farmsRepository
      .createQueryBuilder("crops")
      .select("crops.name", "name")
      .addSelect("COUNT(*)", "count")
      .groupBy("crops.name")
      .getRawMany();

    return crop;
  }
}
