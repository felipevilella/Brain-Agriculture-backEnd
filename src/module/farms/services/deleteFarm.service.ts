import { BadRequestException } from "@nestjs/common";
import { logErrorObject, logInfoObject } from "src/infra/helpers/logInfo";
import { FarmsRepository } from "src/infra/repositories/Farms.repository";

export class DeleteFarmService {
  constructor(private readonly farmsRepository: FarmsRepository) {}

  private async deleteProducer(id: string) {
    const existingFarm = await this.farmsRepository.getFarmById(id);
    logInfoObject('DeleteFarmService', existingFarm)

    if (!existingFarm) {
      logErrorObject('DeleteFarmsService - notExistingFarm', {id})
      throw new BadRequestException(`Farm ${id} not found.`);
    }

    await this.farmsRepository.deleteFarm(id);
  }

  async execute(id: string): Promise<void> {
    await this.deleteProducer(id);
  }
}
