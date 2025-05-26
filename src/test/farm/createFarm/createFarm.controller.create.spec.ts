import { Test } from "@nestjs/testing";
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";
import * as request from "supertest";

import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { AllExceptionsFilter } from "src/infra/helpers/all-exceptions.filter";
import { FarmUseCaseProxyModule } from "src/infra/usecase-proxy/farm-usecase-proxy.module";
import {
  CreateFarmDto,
  IFarmMapper,
} from "src/infra/definitions/dtos/farms.dto";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { createFakeFarm, createFakeFarmResponse } from "../farm.mock";
import { FarmController } from "src/module/farms/farms.controller";
import { faker } from "@faker-js/faker/.";

const mockFarmRepository = {
  createFarm: jest.fn(),
  getProducerById: jest.fn(),
};

const executeMock = jest.fn();
const mockCreateFarmServiceProxy = {
  getInstance: jest.fn(() => ({
    execute: executeMock,
  })),
};

describe("FarmController - create", () => {
  let app: INestApplication;
  let createFarm: CreateFarmDto;
  let fakeResponse: IFarmMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [FarmUseCaseProxyModule.register()],
      controllers: [FarmController],
    })
      .overrideProvider({ FarmsRepository, ProducersRepository })
      .useValue(mockFarmRepository)
      .overrideProvider(FarmUseCaseProxyModule.CREATE_FARM_SERVICE)
      .useValue(mockCreateFarmServiceProxy)
      .compile();

    createFarm = createFakeFarm();
    fakeResponse = createFakeFarmResponse();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should return 201 and should create a farm", async () => {
    executeMock.mockResolvedValueOnce(fakeResponse);

    const response = await request(app.getHttpServer())
      .post("/farm")
      .send(createFarm);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(fakeResponse);
  });

  it("should respond with 400 Bad Request for producer creation with areas exceeds the total area", async () => {
    const message = `the sum of arable and vegetation areas exceeds the total area.`;
    executeMock.mockRejectedValueOnce(new BadRequestException(message));

    createFarm.totalArea = 70;
    createFarm.vegetationArea = 70;

    const response = await request(app.getHttpServer())
      .post("/farm")
      .send(createFarm);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(message);
  });

  it("should return 400 and should create a farm", async () => {
    const id = faker.string.uuid();
    const message = `Producer ${id} not found.`;

    executeMock.mockRejectedValueOnce(new BadRequestException(message));

    const response = await request(app.getHttpServer())
      .post("/farm")
      .send(createFarm);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(message);
  });

  it("should respond with 400 Bad Request", async () => {
    const response = await request(app.getHttpServer()).post("/farm").send({});

    expect(response.status).toBe(400);
  });

  it("should respond with 500 for unexpected errors", async () => {
    executeMock.mockRejectedValueOnce(new Error("Unexpected error"));

    const response = await request(app.getHttpServer())
      .post("/farm")
      .send(createFarm);

    expect(response.status).toBe(500);
  });
});
