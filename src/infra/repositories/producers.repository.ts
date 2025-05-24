import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Producers } from "../entities/producers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IProducersRepository } from "src/repositories/producers.repository.interface";
import { Repository } from "typeorm";
import { TYPE_DOCUMENT } from "../definitions/producers.type";
import {
  CreateProducerDto,
  IProducerDto,
  UpdateProducerDto,
} from "src/module/producers/dto/producers.dto";


@Injectable()
export class ProducersRepository implements IProducersRepository {
  constructor(
    @InjectRepository(Producers)
    private readonly producersRepository: Repository<Producers>
  ) {}

  async getProducerByDocument(
    document: string,
    typeDocument: TYPE_DOCUMENT
  ): Promise<IProducerDto | null> {
    const producer = (await this.producersRepository.findOneBy({
      document,
      typeDocument,
    })) as unknown as IProducerDto;

    return producer ?? null;
  }

  async getProducerById(
    id: string,
  ): Promise<IProducerDto> {
    return  this.producersRepository.findOneBy({id}) as unknown as IProducerDto;
  }

  

  async updateProducer(
    producerId: string,
    data: UpdateProducerDto,
  ): Promise<void> {
    await this.producersRepository.update({ id: producerId }, data);
  }

    async deleteProducer(
    producerId: string,
  ): Promise<void> {
    await this.producersRepository.update({ id: producerId }, {deletedAt: new Date()});
  }

  async createProducer(
    producer: CreateProducerDto
  ): Promise<IProducerDto> {
    const newProducer = this.producersRepository.create(producer);
    await this.producersRepository.save(newProducer);

    return newProducer as unknown as IProducerDto;
  }
}
