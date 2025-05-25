import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFarmDto, IFarmDto } from "src/module/farms/dto/farms.dto";
import { IFarmsRepository } from "src/repositories/farms.repository.interface";
import { Repository } from "typeorm";

import { Crops } from "../entities/crops.entity";
import { Farms } from "../entities/farms.entity";
import { Harvests } from "../entities/havests.entity";

@Injectable()
export class FarmsRepository implements IFarmsRepository {
  constructor(
    @InjectRepository(Farms)
    private readonly farmsRepository: Repository<Farms>
  ) {}

  async createFarm(farmDto: CreateFarmDto): Promise<IFarmDto> {
    const farm = this.farmsRepository.create({ ...farmDto, harvests: [] });

    farm.harvests =
      farmDto.harvests?.map((harvestDto) => {
        const harvest = new Harvests();
        harvest.name = harvestDto.name;
        harvest.year = harvestDto.year;
        harvest.farm = farm;

        harvest.crops =
          harvestDto.crops?.map((cropDto) => {
            const crop = new Crops();
            crop.name = cropDto.name;
            crop.harvests = harvest; 
            return crop;
          }) ?? [];

        return harvest;
      }) ?? [];

    const newFarm = await this.farmsRepository.save(farm);

    return newFarm as IFarmDto
  }
}
