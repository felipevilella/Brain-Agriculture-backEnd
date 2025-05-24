import { BadRequestException } from "@nestjs/common";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import {
  CreateProducerDto,
  IProducerDto,
  IProducerMapper,
  UpdateProducerDto,
} from "../dto/producers.dto";
import { TYPE_DOCUMENT } from "src/infra/definitions/producers.type";
import { ProducerMapper } from "../mapper/producers.mapper";

export class CreateOrUpdateProducerService {
  constructor(private readonly producersRepository: ProducersRepository) {}

  private async hasProducerByDocument(
    document: string,
    typeDocument: TYPE_DOCUMENT
  ): Promise<void> {
    const hasProducer = await this.producersRepository.getProducerByDocument(
      document,
      typeDocument
    );
    if (hasProducer) {
      throw new BadRequestException(
        "The document is already in use. Please use a different one."
      );
    }
  }

  private async createProducer(producer: CreateProducerDto) {
    await this.hasProducerByDocument(producer.document, producer.typeDocument);

    const createdProducer =
      await this.producersRepository.createProducer(producer);

    return createdProducer;
  }

  private async updateProducer(id: string, data: UpdateProducerDto) {
    const existingProducer = await this.producersRepository.getProducerById(id);

    if (!existingProducer) {
      throw new BadRequestException(`Producer ${id} not found.`);
    }

    const isChangingDocument =
      data.document && data.document !== existingProducer.document;

    if (isChangingDocument) {
      await this.hasProducerByDocument(data.document, data.typeDocument);
    }

    await this.producersRepository.updateProducer(id, data);

    const updatedProducer = await this.producersRepository.getProducerById(id);
    return updatedProducer;
  }

  async execute(
    producer: CreateProducerDto | UpdateProducerDto,
    id?: string
  ): Promise<IProducerMapper> {
    console.log("aqui");
    console.log(id);
    const result = id
      ? await this.updateProducer(id, producer)
      : await this.createProducer(producer);

    return ProducerMapper.toDTO(result);
  }
}
