import { Test } from "@nestjs/testing";
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";
import * as request from "supertest";

import { faker } from "@faker-js/faker/.";
import { IFarmMapper } from "src/infra/definitions/dtos/farms.dto";
import { FarmUseCaseProxyModule } from "src/infra/usecase-proxy/farm-usecase-proxy.module";
import { FarmController } from "src/module/farms/farms.controller";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { createFakeFarmResponse } from "../farm.mock";
import { AllExceptionsFilter } from "src/infra/helpers/all-exceptions.filter";

const mockFarmRepository = {
  update: jest.fn(),
};

const executeMock = jest.fn();
const mockCreateFarmServiceProxy = {
  getInstance: jest.fn(() => ({
    execute: executeMock,
  })),
};

describe("FarmController - delete", () => {
  let app: INestApplication;
  let fakeResponse: IFarmMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [FarmUseCaseProxyModule.register()],
      controllers: [FarmController],
    })
      .overrideProvider(FarmsRepository)
      .useValue(mockFarmRepository)
      .overrideProvider(FarmUseCaseProxyModule.DELETE_FARM_SERVICE)
      .useValue(mockCreateFarmServiceProxy)
      .compile();

    fakeResponse = createFakeFarmResponse();

    app = module.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should return 204 and delete farm", async () => {
    executeMock.mockResolvedValueOnce(undefined);

    const response = await request(app.getHttpServer())
      .delete(`/farm/${fakeResponse.id}`)
      .send();

    console.log(response.body);

    expect(response.status).toBe(204);
  });

  it("should return 400 and should delete a farm", async () => {
    const id = faker.string.uuid();
    const message = `farm ${id} not found.`;

    executeMock.mockRejectedValueOnce(new BadRequestException(message));

    const response = await request(app.getHttpServer())
      .delete(`/farm/${id}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(message);
  });

  it("should respond with 500 for unexpected errors", async () => {
    executeMock.mockRejectedValueOnce(new Error("Unexpected error"));
    const response = await request(app.getHttpServer())
      .delete(`/farm/${fakeResponse.id}`)
      .send();
    expect(response.status).toBe(500);
  });
});
