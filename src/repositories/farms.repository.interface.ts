import { CreateFarmDto, IFarmDto, ITotalArableVegetationDto, ITotalFarmByStateDto } from "src/infra/definitions/dtos/farms.dto"

export interface IFarmsRepository {
  createFarm: (producer: CreateFarmDto) => Promise<IFarmDto>
  getTotalFarms:()=>Promise<number>
  getTotalAreaFarms:()=>Promise<number>
  getTotalFarmByStates:() => Promise<ITotalFarmByStateDto[]>
  getTotalArableVegetation(): Promise<ITotalArableVegetationDto>
}

