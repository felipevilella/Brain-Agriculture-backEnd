import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";

import { ProducerController } from "src/module/producers/producers.controller";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { ProducerUseCaseProxyModule } from "src/infra/usecase-proxy/producer-usecase-proxy.module";
import { IProducerMapper } from "src/infra/definitions/dtos/producers.dto";

import { listFakerProducer } from "../producer.mock";
import { AllExceptionsFilter } from "src/infra/helpers/all-exceptions.filter";

const mockProducerRepository = {
  listProducers: jest.fn(),
};

const executeMock = jest.fn();
const mockCreateProducerServiceProxy = {
  getInstance: jest.fn(() => ({
    execute: executeMock,
  })),
};

describe("ProducerController - list", () => {
  let app: INestApplication;
  let listFakerProducerResponse: IProducerMapper[];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProducerUseCaseProxyModule.register()],
      controllers: [ProducerController],
    })
      .overrideProvider(ProducersRepository)
      .useValue(mockProducerRepository)
      .overrideProvider(ProducerUseCaseProxyModule.LIST_PRODUCER_SERVICE)
      .useValue(mockCreateProducerServiceProxy)
      .compile();

    listFakerProducerResponse = listFakerProducer();

    app = module.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should return 200 and list all producers", async () => {
    executeMock.mockResolvedValueOnce(listFakerProducerResponse);

    const response = await request(app.getHttpServer())
      .get("/producer/list")
      .send();

    expect(response.status).toBe(200);
    const expectedResponse = JSON.parse(
      JSON.stringify(listFakerProducerResponse)
    );

    expect(response.body).toEqual(expectedResponse);
  });
});
