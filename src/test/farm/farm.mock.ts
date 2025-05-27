import { faker } from "@faker-js/faker/locale/pt_BR";
import { CROPY_TYPES } from "src/infra/definitions/crops.type";
import {
  CreateFarmDto,
  IFarmMapper,
} from "src/infra/definitions/dtos/farms.dto";
import { STATES_TYPE } from "src/infra/definitions/localizations.type";

const producerId = faker.string.uuid();

export function createFakeFarmResponse(): IFarmMapper {
  return {
    id: faker.string.uuid(),
    producerId: producerId,
    name: faker.company.name(),
    city: faker.location.city(),
    state: STATES_TYPE.MG,
    totalArea: 120,
    arableArea: 70,
    vegetationArea: 50,
    harvests: [
      {
        id: faker.string.uuid(),
        name: "Winter Harvest",
        year: 2024,
        crops: [
          {
            id: faker.string.uuid(),
            name: CROPY_TYPES.BANANA,
          },
        ],
      },
    ],
  };
}
export function createFakeFarm(): CreateFarmDto {
  return {
    producerId: producerId,
    name: faker.company.name(),
    city: faker.location.city(),
    state: STATES_TYPE.MG,
    totalArea: 120,
    arableArea: 70,
    vegetationArea: 50,
    harvests: [
      {
        name: "Winter Harvest",
        year: 2024,
        crops: [
          {
            name: CROPY_TYPES.BANANA,
          },
        ],
      },
    ],
  };
}
