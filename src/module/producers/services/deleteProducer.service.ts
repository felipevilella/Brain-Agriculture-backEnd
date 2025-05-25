import { BadRequestException } from "@nestjs/common";
import { ProducersRepository } from "src/infra/repositories/producers.repository";

export class DeleteProducerService {
  constructor(private readonly producersRepository: ProducersRepository) {}

  private async deleteProducer(id: string) {
    const existingProducer = await this.producersRepository.getProducerById(id);

    if (!existingProducer) {
      throw new BadRequestException(`Producer ${id} not found.`);
    }

    await this.producersRepository.deleteProducer(id);
  }

  async execute(id: string): Promise<void> {
    await this.deleteProducer(id);
  }
}
