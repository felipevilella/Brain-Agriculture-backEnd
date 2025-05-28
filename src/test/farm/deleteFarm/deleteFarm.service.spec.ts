import { BadRequestException } from "@nestjs/common";


import { faker } from "@faker-js/faker/.";
import { createFakeFarm, createFakeFarmResponse } from "../farm.mock";
import { DeleteFarmService } from "src/module/farms/services/deleteFarm.service";
import { FarmsRepository } from "src/infra/repositories/farms.repository";

describe("DeleteFarmService", () => {
  let fakeFarmEntity = createFakeFarmResponse();

  const farmsRepository = {
    deleteFarm: jest.fn(),
    getFarmById: jest.fn(),
  };

  const deleteFarmService = new DeleteFarmService(
    farmsRepository as unknown as FarmsRepository
  );

  it("should be instantiable", () => {
    expect(deleteFarmService).toBeInstanceOf(DeleteFarmService);
    expect(deleteFarmService.execute).toBeInstanceOf(Function);
    expect(deleteFarmService.execute).toBe(
      DeleteFarmService.prototype.execute
    );
  });

  it("should throw BadRequest if document already exists", async () => {
    farmsRepository.getFarmById.mockResolvedValueOnce(undefined);

    const id = faker.string.uuid();
    await expect(deleteFarmService.execute(id)).rejects.toThrow(
      BadRequestException
    );
  });

  it("should delete producer successfully if document is unique", async () => {
    farmsRepository.getFarmById.mockResolvedValueOnce(
      fakeFarmEntity
    );

    const result = await deleteFarmService.execute(fakeFarmEntity.id);
    expect(result).toEqual(undefined);
  });
});
