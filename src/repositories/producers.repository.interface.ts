import { CreateProducerDto, IProducerDto } from "src/infra/definitions/dtos/producers.dto";
import { TYPE_DOCUMENT } from "src/infra/definitions/producers.type";


export interface IProducersRepository {
  createProducer: (producer: CreateProducerDto) => Promise<IProducerDto>;
  getProducerByDocument: (document: string, typeDocument: TYPE_DOCUMENT) => Promise<IProducerDto | null>
  getProducerById: (id:string) => Promise<IProducerDto>
  updateProducer:(producerId: string, data: CreateProducerDto) => Promise<void>
  deleteProducer:(producerId: string) => Promise<void>
  listProducers:() => Promise<IProducerDto[]>
}

