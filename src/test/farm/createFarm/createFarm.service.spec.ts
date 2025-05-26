import { BadRequestException } from "@nestjs/common";
import { createFakeFarm, createFakeFarmResponse } from "../farm.mock";
import { CreateFarmService } from "src/module/farms/services/createFarm.services";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { createFakeProducerResponse } from "src/test/producer/producer.mock";

describe("CreateFarmService", () => {
  const createFarmDto = createFakeFarm();
  const fakeFarmEntity = createFakeFarmResponse();
  const createProducers = createFakeProducerResponse();

  const producersRepository = {
    getProducerById: jest.fn(),
  };

  const farmsRepository = {
    createFarm: jest.fn(),
  };

  const createFarmService = new CreateFarmService(
    farmsRepository as unknown as FarmsRepository,
    producersRepository as unknown as ProducersRepository
  );

  it("should be instantiable", () => {
    expect(createFarmService).toBeInstanceOf(CreateFarmService);
    expect(createFarmService.execute).toBeInstanceOf(Function);
    expect(createFarmService.execute).toBe(CreateFarmService.prototype.execute);
  });

  it("should throw BadRequest if producer not exists", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(undefined);

    await expect(createFarmService.execute(createFarmDto)).rejects.toThrow(
      BadRequestException
    );
    expect(farmsRepository.createFarm).not.toHaveBeenCalled();
  });

  it("should create farm successfully", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(createProducers);
    farmsRepository.createFarm.mockResolvedValueOnce(fakeFarmEntity);

    createFarmDto.producerId = createProducers.id;
    const result = await createFarmService.execute(createFarmDto);

    expect(farmsRepository.createFarm).toHaveBeenCalledWith(createFarmDto);
    expect(result).toEqual(fakeFarmEntity);
  });
});
