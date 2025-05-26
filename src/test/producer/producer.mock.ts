import { faker } from "@faker-js/faker/locale/pt_BR";
import {
  CreateProducerDto,
  IProducerMapper,
} from "src/infra/definitions/dtos/producers.dto";
import { STATES_TYPE } from "src/infra/definitions/localizations.type";
import { TYPE_DOCUMENT } from "src/infra/definitions/producers.type";

import { cnpj } from "cpf-cnpj-validator";
import { CROPY_TYPES } from "src/infra/definitions/crops.type";

interface ProducerData {
  name: string;
  document: string;
}

function generateProducerData(): ProducerData {
  return {
    name: faker.person.fullName(),
    document: cnpj.generate(),
  };
}

const producerData = generateProducerData();

export function createFakeProducer(): CreateProducerDto {
  return {
    name: producerData.name,
    city: faker.location.city(),
    states: faker.helpers.arrayElement([
      STATES_TYPE.MG,
      STATES_TYPE.SP,
      STATES_TYPE.BA,
      STATES_TYPE.BA,
    ]),
    document: producerData.document,
    typeDocument: TYPE_DOCUMENT.CNPJ,
  };
}

export function createFakeProducerResponse(): IProducerMapper {
  return {
    id: faker.string.uuid(),
    name: producerData.name,
    city: faker.location.city(),
    states: faker.helpers.arrayElement([
      STATES_TYPE.MG,
      STATES_TYPE.SP,
      STATES_TYPE.BA,
      STATES_TYPE.BA,
    ]),
    document: producerData.document,
    typeDocument: TYPE_DOCUMENT.CNPJ,
  };
}

export function createFakeProducerFarm(): IProducerMapper {
  const producerId = faker.string.uuid();

  const producer = {
    id: producerId,
    name: faker.person.fullName(),
    city: faker.location.city(),
    states: faker.helpers.arrayElement([
      STATES_TYPE.MG,
      STATES_TYPE.SP,
      STATES_TYPE.BA,
      STATES_TYPE.BA,
    ]),
    document: cnpj.generate(),
    typeDocument: TYPE_DOCUMENT.CNPJ,
    farms: [
      {
        id: faker.string.uuid(),
        name: faker.company.name() + " Farm",
        city: faker.location.city(),
        states: faker.helpers.arrayElement([
          STATES_TYPE.MG,
          STATES_TYPE.SP,
          STATES_TYPE.BA,
          STATES_TYPE.BA,
        ]),
        totalArea: faker.number.int({ min: 50, max: 500 }),
        arableArea: faker.number.int({ min: 10, max: 200 }),
        vegetationArea: faker.number.int({ min: 10, max: 200 }),
        producerId,
        harvests: [
          {
            id: faker.string.uuid(),
            name: faker.helpers.arrayElement([
              "Winter Harvest",
              "Summer Harvest",
              "Spring Harvest",
            ]),
            year: faker.date.past({ years: 2 }).getFullYear(),
            crops: [
              {
                id: faker.string.uuid(),
                name: faker.helpers.arrayElement([
                  CROPY_TYPES.BANANA,
                  CROPY_TYPES.CABBAGE,
                  CROPY_TYPES.COFFEE,
                  CROPY_TYPES.COTTON,
                ]),
              },
            ],
          },
        ],
      },
    ],
  };

  return producer;
}

export function listFakerProducer(): IProducerMapper[] {
  return [
    createFakeProducerFarm(),
    createFakeProducerFarm(),
    createFakeProducerFarm(),
    createFakeProducerFarm(),
    createFakeProducerFarm(),
  ];
}
