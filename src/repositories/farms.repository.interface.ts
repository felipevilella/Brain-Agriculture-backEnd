import { CreateFarmDto, IFarmDto } from "src/module/farms/dto/farms.dto";

export interface IFarmsRepository {
  createFarm: (producer: CreateFarmDto) => Promise<IFarmDto>;
}

