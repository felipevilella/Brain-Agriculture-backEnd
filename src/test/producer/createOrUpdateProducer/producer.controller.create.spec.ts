import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";

import { ProducerController } from "src/module/producers/producers.controller";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { ProducerUseCaseProxyModule } from "src/infra/usecase-proxy/producer-usecase-proxy.module";
import {
  CreateProducerDto,
  IProducerMapper,
} from "src/infra/definitions/dtos/producers.dto";

import {
  createFakeProducer,
  createFakeProducerResponse,
} from "../producer.mock";
import { AllExceptionsFilter } from "src/infra/helpers/all-exceptions.filter";

const mockProducerRepository = {
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
};

const executeMock = jest.fn();
const mockCreateProducerServiceProxy = {
  getInstance: jest.fn(() => ({
    execute: executeMock,
  })),
};

describe("FarmController - create", () => {
  let app: INestApplication;
  let createProducer: CreateProducerDto;
  let fakeResponse: IProducerMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProducerUseCaseProxyModule.register()],
      controllers: [ProducerController],
    })
      .overrideProvider(ProducersRepository)
      .useValue(mockProducerRepository)
      .overrideProvider(
        ProducerUseCaseProxyModule.CREATE_OR_UPDATE_PRODUCER_SERVICE
      )
      .useValue(mockCreateProducerServiceProxy)
      .compile();

    createProducer = createFakeProducer();
    fakeResponse = createFakeProducerResponse();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should return 201 and should create a producer", async () => {
    executeMock.mockResolvedValueOnce(fakeResponse);

    const response = await request(app.getHttpServer())
      .post("/producer")
      .send(createProducer);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(fakeResponse);
  });
});
