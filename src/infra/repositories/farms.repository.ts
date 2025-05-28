import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { IFarmsRepository } from "src/repositories/farms.repository.interface";
import { Repository } from "typeorm";

import { Crops } from "../entities/crops.entity";
import { Farms } from "../entities/farms.entity";
import { Harvests } from "../entities/havests.entity";
import {
  CreateFarmDto,
  IFarmDto,
  ITotalArableVegetationDto,
  ITotalFarmByStateDto,
  UpdateFarmDTO,
} from "../definitions/dtos/farms.dto";

@Injectable()
export class FarmsRepository implements IFarmsRepository {
  constructor(
    @InjectRepository(Farms)
    private readonly farmsRepository: Repository<Farms>
  ) {}

  async getTotalFarmByStates(): Promise<ITotalFarmByStateDto[]> {
    const farm = await this.farmsRepository
      .createQueryBuilder("farms")
      .select("farms.state", "state")
      .addSelect("COUNT(*)", "count")
      .groupBy("farms.state")
      .getRawMany();

    return farm;
  }

  async getTotalFarms(): Promise<number> {
    const farm = await await this.farmsRepository
      .createQueryBuilder("farms")
      .select("COUNT(*)", "count")
      .getRawOne();

    return farm.count;
  }

  async getFarmById(id: string): Promise<IFarmDto> {
    return (await this.farmsRepository.findOne({
      where: { id },
      relations: ["harvests", "harvests.crops"],
    })) as IFarmDto;
  }

  async getTotalArableVegetation(): Promise<ITotalArableVegetationDto> {
    const result = await this.farmsRepository
      .createQueryBuilder("farms")
      .select("SUM(farms.arableArea)", "arable")
      .addSelect("SUM(farms.vegetationArea)", "vegetation")
      .getRawOne();

    return {
      arableArea: Number(result.arable),
      vegetationArea: Number(result.vegetation),
    };
  }

  async getTotalAreaFarms(): Promise<number> {
    const farm = await this.farmsRepository
      .createQueryBuilder("farms")
      .select("SUM(farms.totalArea)", "sum")
      .getRawOne();

    return farm.sum;
  }

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

    return newFarm as IFarmDto;
  }

  async updateFarm(id: string, farmDto: UpdateFarmDTO): Promise<void> {
    const existingFarm = await this.farmsRepository.findOne({
      where: { id },
      relations: ["harvests", "harvests.crops"],
    });

    if (existingFarm) {
      this.farmsRepository.merge(existingFarm, farmDto);
      existingFarm.harvests =
        farmDto.harvests?.map((harvestDto) => {
          const harvest = new Harvests();
          harvest.name = harvestDto.name;
          harvest.year = harvestDto.year;
          harvest.farm = existingFarm;

          harvest.crops =
            harvestDto.crops?.map((cropDto) => {
              const crop = new Crops();
              crop.name = cropDto.name;
              crop.harvests = harvest;
              return crop;
            }) ?? [];

          return harvest;
        }) ?? [];

      await this.farmsRepository.save(existingFarm);
    }
  }
}
