import { IProducerMapper } from "src/infra/definitions/dtos/producers.dto";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { ProducerMapper } from "../mapper/producers.mapper";

export class ListProducerService {
  constructor(private readonly producersRepository: ProducersRepository) {}

  private async listProducers():Promise<IProducerMapper[]> {
    const producers = await this.producersRepository.listProducers();

    console.log(producers)

    return producers.map((producer) => {
      return ProducerMapper.toDTO(producer)
    })
  }

  async execute(): Promise<IProducerMapper[]> {
    return await this.listProducers();
  }
}
