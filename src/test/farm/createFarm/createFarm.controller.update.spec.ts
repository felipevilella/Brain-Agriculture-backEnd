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

  IFarmMapper,
  UpdateFarmDTO,
} from "src/infra/definitions/dtos/farms.dto";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { createFakeFarm, createFakeFarmResponse } from "../farm.mock";
import { FarmController } from "src/module/farms/farms.controller";

const mockFarmRepository = {
  updateFarm: jest.fn(),
  getProducerById: jest.fn(),
};

const executeMock = jest.fn();
const mockCreateOrUpdateFarmServiceProxy = {
  getInstance: jest.fn(() => ({
    execute: executeMock,
  })),
};

describe("FarmController - update", () => {
  let app: INestApplication;
  let updateFarm: UpdateFarmDTO;
  let fakeResponse: IFarmMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [FarmUseCaseProxyModule.register()],
      controllers: [FarmController],
    })
      .overrideProvider({ FarmsRepository, ProducersRepository })
      .useValue(mockFarmRepository)
      .overrideProvider(FarmUseCaseProxyModule.CREATE_OR_UPDATE_FARM_SERVICE)
      .useValue(mockCreateOrUpdateFarmServiceProxy)
      .compile();

    updateFarm = createFakeFarm();
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

  it("should return 200 and should update a farm", async () => {
    executeMock.mockResolvedValueOnce(fakeResponse);

    const response = await request(app.getHttpServer())
      .put(`/farm/${fakeResponse.id}`)
      .send(updateFarm);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeResponse);
  });

  it("should respond with 400 Bad Request for producer updated with areas exceeds the total area", async () => {
    const message = `the sum of arable and vegetation areas exceeds the total area.`;
    executeMock.mockRejectedValueOnce(new BadRequestException(message));

    updateFarm.totalArea = 70;
    updateFarm.vegetationArea = 70;

    const response = await request(app.getHttpServer())
      .put(`/farm/${fakeResponse.id}`)
      .send(updateFarm);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(message);
  });


   it("should respond with 400 Bad Request for producer updated with farmId not Found", async () => {
    const message = `Farm ${fakeResponse.id} not found`;
    executeMock.mockRejectedValueOnce(new BadRequestException(message));

    const response = await request(app.getHttpServer())
      .put(`/farm/${fakeResponse.id}`)
      .send(updateFarm);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(message);
  });


  it("should respond with 500 for unexpected errors", async () => {
    executeMock.mockRejectedValueOnce(new Error("Unexpected error"));

    const response = await request(app.getHttpServer())
      .put(`/farm/${fakeResponse.id}`)
      .send(updateFarm);

    expect(response.status).toBe(500);
  });
});
