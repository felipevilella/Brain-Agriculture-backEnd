import { Test } from "@nestjs/testing";
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";
import * as request from "supertest";

import { ProducerController } from "src/module/producers/producers.controller";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { ProducerUseCaseProxyModule } from "src/infra/usecase-proxy/producer-usecase-proxy.module";
import { IProducerMapper } from "src/infra/definitions/dtos/producers.dto";

import { createFakeProducerFarm } from "../producer.mock";
import { AllExceptionsFilter } from "src/infra/helpers/all-exceptions.filter";
import { faker } from "@faker-js/faker/.";

const mockProducerRepository = {
  update: jest.fn(),
};

const executeMock = jest.fn();
const mockCreateProducerServiceProxy = {
  getInstance: jest.fn(() => ({
    execute: executeMock,
  })),
};

describe("ProducerController - delete", () => {
  let app: INestApplication;
  let fakeResponse: IProducerMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProducerUseCaseProxyModule.register()],
      controllers: [ProducerController],
    })
      .overrideProvider(ProducersRepository)
      .useValue(mockProducerRepository)
      .overrideProvider(ProducerUseCaseProxyModule.DELETE_PRODUCER_SERVICE)
      .useValue(mockCreateProducerServiceProxy)
      .compile();

    fakeResponse = createFakeProducerFarm();

    app = module.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should return 204 and delete producers", async () => {
    executeMock.mockResolvedValueOnce(undefined);

    const response = await request(app.getHttpServer())
      .delete(`/producer/${fakeResponse.id}`)
      .send();

    console.log(response.body);

    expect(response.status).toBe(204);
  });

  it("should return 400 and should delete a producer", async () => {
    const id = faker.string.uuid();
    const message = `Producer ${id} not found.`;

    executeMock.mockRejectedValueOnce(new BadRequestException(message));

    const response = await request(app.getHttpServer())
      .delete(`/producer/${id}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(message);
  });

  it("should respond with 500 for unexpected errors", async () => {
    executeMock.mockRejectedValueOnce(new Error("Unexpected error"));
    const response = await request(app.getHttpServer())
      .delete(`/producer/${fakeResponse.id}`)
      .send();
    expect(response.status).toBe(500);
  });
});
