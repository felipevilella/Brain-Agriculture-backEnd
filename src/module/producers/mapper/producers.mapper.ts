import { instanceToInstance } from "class-transformer";
import { IProducerDto, IProducerMapper } from "src/infra/definitions/dtos/producers.dto";
import { FarmMapper } from "src/module/farms/mapper/farms.mapper";


class ProducerMapper {
  static toDTO({ city, document, name, typeDocument, id, state, farms }: IProducerDto): IProducerMapper {
    return instanceToInstance({
      id,
      name,
      city,
      state,
      typeDocument,
      document,
      farms: farms && farms?.length > 0 ? FarmMapper.toDTOList(farms) : undefined,
    });
  }
}

export { ProducerMapper };
