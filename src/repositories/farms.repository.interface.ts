import { CreateFarmDto, IFarmDto, ITotalArableVegetationDto, ITotalFarmByStateDto, UpdateFarmDTO } from "src/infra/definitions/dtos/farms.dto"

export interface IFarmsRepository {
  createFarm: (farm: CreateFarmDto) => Promise<IFarmDto>
  updateFarm: (d: string, farm: UpdateFarmDTO) => Promise<void>
  getTotalFarms:()=>Promise<number>
  getFarmById:(id: string) => Promise<IFarmDto>
  getTotalAreaFarms:()=>Promise<number>
  getTotalFarmByStates:() => Promise<ITotalFarmByStateDto[]>
  getTotalArableVegetation(): Promise<ITotalArableVegetationDto>
}

