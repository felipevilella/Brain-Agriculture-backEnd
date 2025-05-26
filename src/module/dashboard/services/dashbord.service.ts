import { FarmsRepository } from "src/infra/repositories/farms.repository";
import {
  ITotalArableVegetationDto,
  ITotalFarmByStateDto,
} from "src/infra/definitions/dtos/farms.dto";
import { CropRepository } from "src/infra/repositories/crop.repository";
import { ITotalCropNameDto } from "src/infra/definitions/dtos/crop.dtos";
import { logInfoObject } from "src/infra/helpers/logInfo";

export interface IDashboardDto {
  totalFarms: number;
  totalAreaFarms: number;
  PieChart: {
    TotalFarmByStates: ITotalFarmByStateDto[];
    totalCropsName: ITotalCropNameDto[];
    totalArableVegetation: ITotalArableVegetationDto;
  };
}

export class DashboardService {
  constructor(
    private readonly farmRepository: FarmsRepository,
    private readonly cropsRepository: CropRepository
  ) {}

  private async getInformation(): Promise<IDashboardDto> {
    const totalFarms = await this.farmRepository.getTotalFarms();
    const totalAreaFarms = await this.farmRepository.getTotalAreaFarms();
    const TotalFarmByStates = await this.farmRepository.getTotalFarmByStates();
    const totalArableVegetation =
      await this.farmRepository.getTotalArableVegetation();
      

    const totalCropsName = await this.cropsRepository.getTotalCropByName();
    logInfoObject('totalCropsName', totalCropsName)

    return {
      totalFarms,
      totalAreaFarms,
      PieChart: {
        totalCropsName,
        totalArableVegetation,
        TotalFarmByStates,
      },
    };
  }

  async execute(): Promise<IDashboardDto> {
    const data = await this.getInformation();

    return data;
  }
}
