import { instanceToInstance } from "class-transformer";

import { IProducerMapper, IProducerDto } from "../dto/producers.dto";
class ProducerMapper {
  static toDTO({ city, document, name, type, id, states }: IProducerDto): IProducerMapper {
    return instanceToInstance({
      id,
      name,
      city,
      states,
      type,
      document
    });
  }
}

export { ProducerMapper };
