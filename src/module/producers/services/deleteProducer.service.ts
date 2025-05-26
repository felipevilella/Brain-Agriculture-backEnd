import { BadRequestException } from "@nestjs/common";
import { logErrorObject, logInfoObject } from "src/infra/helpers/logInfo";
import { ProducersRepository } from "src/infra/repositories/producers.repository";

export class DeleteProducerService {
  constructor(private readonly producersRepository: ProducersRepository) {}

  private async deleteProducer(id: string) {
    const existingProducer = await this.producersRepository.getProducerById(id);
    logInfoObject('DeleteProducerService', existingProducer)

    if (!existingProducer) {
      logErrorObject('DeleteProducerService - notExistingProducer', {id})
      throw new BadRequestException(`Producer ${id} not found.`);
    }

    await this.producersRepository.deleteProducer(id);
  }

  async execute(id: string): Promise<void> {
    await this.deleteProducer(id);
  }
}
