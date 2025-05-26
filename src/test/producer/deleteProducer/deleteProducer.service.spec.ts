import { BadRequestException } from "@nestjs/common";

import { createFakeProducerFarm } from "../producer.mock";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { DeleteProducerService } from "src/module/producers/services/deleteProducer.service";
import { faker } from "@faker-js/faker/.";

describe("DeleteProducerService", () => {
  let fakeProducerEntity = createFakeProducerFarm();

  const producersRepository = {
    deleteProducer: jest.fn(),
    getProducerById: jest.fn(),
  };

  const deleteProducerService = new DeleteProducerService(
    producersRepository as unknown as ProducersRepository
  );

  it("should be instantiable", () => {
    expect(deleteProducerService).toBeInstanceOf(DeleteProducerService);
    expect(deleteProducerService.execute).toBeInstanceOf(Function);
    expect(deleteProducerService.execute).toBe(
      DeleteProducerService.prototype.execute
    );
  });

  it("should throw BadRequest if document already exists", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(undefined);

    const id = faker.string.uuid();
    await expect(deleteProducerService.execute(id)).rejects.toThrow(
      BadRequestException
    );
  });

  it("should delete producer successfully if document is unique", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(
      fakeProducerEntity
    );

    const result = await deleteProducerService.execute(fakeProducerEntity.id);
    expect(result).toEqual(undefined);
  });
});
