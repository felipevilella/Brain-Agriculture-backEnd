import { instanceToInstance } from "class-transformer";
import { FarmMapper } from "src/module/farms/mapper/farms.mapper";

import { IProducerDto,IProducerMapper } from "../dto/producers.dto";
class ProducerMapper {
  static toDTO({ city, document, name, type, id, states, farms }: IProducerDto): IProducerMapper {
    return instanceToInstance({
      id,
      name,
      city,
      states,
      type,
      document,
      farms: farms && farms?.length > 0 ? FarmMapper.toDTOList(farms) : [],
    });
  }
}

export { ProducerMapper };
