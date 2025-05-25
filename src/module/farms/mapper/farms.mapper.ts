import { instanceToInstance } from "class-transformer";

import { ICropDto, IFarmDto, IFarmMapper,IHarvestDto } from "../dto/farms.dto";

class FarmMapper {
  static toDTO(farm: IFarmDto): IFarmMapper {
    return instanceToInstance({
      id: farm.id,
      name: farm.name,
      city: farm.city,
      states: farm.states,
      totalArea: farm.totalArea,
      arableArea: farm.arableArea,
      vegetationArea: farm.vegetationArea,
      producerId: farm.producerId,
      harvests: farm.harvests?.map((h) => ({
        id: h.id,
        name: h.name,
        year: h.year,
        crops: h.crops?.map((c) => ({
          id: c.id,
          name: c.name,
        })) as ICropDto[],
      })) as IHarvestDto[],
    });
  }

  static toDTOList(farms: IFarmDto[]): IFarmMapper[] {
    return farms.map((farm) => this.toDTO(farm));
  }
}

export { FarmMapper };
