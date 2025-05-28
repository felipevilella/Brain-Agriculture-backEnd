import { BadRequestException } from "@nestjs/common";
import { createFakeFarm, createFakeFarmResponse } from "../farm.mock";
import { FarmsRepository } from "src/infra/repositories/farms.repository";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { createFakeProducerResponse } from "src/test/producer/producer.mock";
import { CreateOrUpdateFarmService } from "src/module/farms/services/createOrUpdateFarm.services";
import { HarvestsRepository } from "src/infra/repositories/harvestsRepository";

describe("CreateOrUpdateFarmService", () => {
  const createFarmDto = createFakeFarm();
  const fakeFarmEntity = createFakeFarmResponse();
  const createProducers = createFakeProducerResponse();

  const producersRepository = {
    getProducerById: jest.fn(),
  };

  const farmsRepository = {
    createFarm: jest.fn(),
    getFarmById: jest.fn(),
    updateFarm: jest.fn(),
  };

  const harvestsRepository = {
    deleteByFarmId: jest.fn(),
  };

  const createOrUpdateFarmService = new CreateOrUpdateFarmService(
    farmsRepository as unknown as FarmsRepository,
    producersRepository as unknown as ProducersRepository,
    harvestsRepository as unknown as HarvestsRepository
  );

  it("should be instantiable", () => {
    expect(createOrUpdateFarmService).toBeInstanceOf(CreateOrUpdateFarmService);
    expect(typeof createOrUpdateFarmService.execute).toBe("function");
  });

  it("should throw BadRequest if producer not exists", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(undefined);

    await expect(
      createOrUpdateFarmService.execute(createFarmDto)
    ).rejects.toThrow(BadRequestException);

    expect(farmsRepository.createFarm).not.toHaveBeenCalled();
    expect(farmsRepository.updateFarm).not.toHaveBeenCalled();
  });

  it("should throw BadRequest if farm not found on update", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(createProducers);
    farmsRepository.getFarmById.mockResolvedValueOnce(undefined);

    await expect(
      createOrUpdateFarmService.execute(createFarmDto, fakeFarmEntity.id)
    ).rejects.toThrow(BadRequestException);

    expect(farmsRepository.updateFarm).not.toHaveBeenCalled();
  });

  it("should create farm successfully", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(createProducers);
    farmsRepository.createFarm.mockResolvedValueOnce(fakeFarmEntity);

    createFarmDto.producerId = createProducers.id;

    const result = await createOrUpdateFarmService.execute(createFarmDto);

    expect(farmsRepository.createFarm).toHaveBeenCalledWith(createFarmDto);
    expect(result).toEqual(fakeFarmEntity);
  });

  it("should update farm successfully", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(createProducers);

    farmsRepository.getFarmById
      .mockResolvedValueOnce(fakeFarmEntity)
      .mockResolvedValueOnce(fakeFarmEntity);

    harvestsRepository.deleteByFarmId.mockResolvedValueOnce(undefined);
    farmsRepository.updateFarm.mockResolvedValueOnce(undefined);

    const result = await createOrUpdateFarmService.execute(
      createFarmDto,
      fakeFarmEntity.id
    );

    expect(harvestsRepository.deleteByFarmId).toHaveBeenCalledWith(
      fakeFarmEntity.id
    );
    expect(farmsRepository.updateFarm).toHaveBeenCalledWith(
      fakeFarmEntity.id,
      createFarmDto
    );
    expect(result).toEqual(fakeFarmEntity);
  });
});
