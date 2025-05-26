import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Crops } from "../entities/crops.entity";
import { ICropRepository } from "src/repositories/crop.repository.interface";
import { ITotalCropNameDto } from "../definitions/dtos/crop.dtos";

@Injectable()
export class CropRepository implements ICropRepository {
  constructor(
    @InjectRepository(Crops)
    private readonly cropsRepository: Repository<Crops>
  ) {}

  async getTotalCropByName(): Promise<ITotalCropNameDto[]> {
    const crop = await this.cropsRepository
      .createQueryBuilder("crops")
      .select("crops.name", "name")
      .addSelect("COUNT(*)", "count")
      .groupBy("crops.name")
      .getRawMany();

    return crop;
  }
}
