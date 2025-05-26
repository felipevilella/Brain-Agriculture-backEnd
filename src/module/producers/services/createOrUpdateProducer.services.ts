import { BadRequestException } from "@nestjs/common";
import {
  CreateProducerDto,
  IProducerMapper,
  UpdateProducerDto,
} from "src/infra/definitions/dtos/producers.dto";
import { TYPE_DOCUMENT } from "src/infra/definitions/producers.type";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { ProducerMapper } from "../mapper/producers.mapper";
import { logErrorObject, logInfoObject } from "src/infra/helpers/logInfo";

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
      logErrorObject("CreateOrUpdateProducerService - hasProducerByDocument", hasProducer);

      throw new BadRequestException(
        "The document is already in use. Please use a different one."
      );
    }
  }

  private async createProducer(producer: CreateProducerDto) {
    await this.hasProducerByDocument(producer.document, producer.typeDocument);

    const createdProducer =
      await this.producersRepository.createProducer(producer);

    logInfoObject("CreateOrUpdateProducerService - createProducer", createdProducer);

    return createdProducer;
  }

  private async updateProducer(id: string, data: UpdateProducerDto) {
    const existingProducer = await this.producersRepository.getProducerById(id);

    if (!existingProducer) {
      logErrorObject("CreateOrUpdateProducerService - updateProducer", existingProducer);
      throw new BadRequestException(`Producer ${id} not found.`);
    }

    const isChangingDocument =
      data.document && data.document !== existingProducer.document;

    if (isChangingDocument) {
      logInfoObject('CreateOrUpdateProducerService -isChangingDocument', {isChangingDocument})
      await this.hasProducerByDocument(data.document, data.typeDocument);
    }

    await this.producersRepository.updateProducer(id, data);

    const updatedProducer = await this.producersRepository.getProducerById(id);

    logInfoObject('CreateOrUpdateProducerService - updatedProducer', updatedProducer)

    return updatedProducer;
  }

  async execute(
    producer: CreateProducerDto | UpdateProducerDto,
    id?: string
  ): Promise<IProducerMapper> {
    const result = id
      ? await this.updateProducer(id, producer)
      : await this.createProducer(producer);

    return ProducerMapper.toDTO(result);
  }
}
