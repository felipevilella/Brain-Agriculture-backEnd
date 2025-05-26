import { BadRequestException } from "@nestjs/common";

import { createFakeProducer, createFakeProducerResponse } from "../producer.mock";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { CreateOrUpdateProducerService } from "src/module/producers/services/createOrUpdateProducer.services";

describe("CreateOrUpdateProducerService", () => {
  const createProducerDto = createFakeProducer();
  const fakeProducerEntity = createFakeProducerResponse();

  const producersRepository = {
    getProducerByDocument: jest.fn(),
    createProducer: jest.fn(),
    getProducerById: jest.fn(),
    updateProducer: jest.fn(),
  };

  const createOrUpdateProducerService = new CreateOrUpdateProducerService(
    producersRepository as unknown as ProducersRepository
  );

  it("should be instantiable", () => {
    expect(createOrUpdateProducerService).toBeInstanceOf(CreateOrUpdateProducerService);
    expect(createOrUpdateProducerService.execute).toBeInstanceOf(Function);
    expect(createOrUpdateProducerService.execute).toBe(CreateOrUpdateProducerService.prototype.execute);
  });

  it("should throw BadRequest if document already exists", async () => {
    producersRepository.getProducerByDocument.mockResolvedValueOnce(fakeProducerEntity);

    await expect(createOrUpdateProducerService.execute(createProducerDto)).rejects.toThrow(BadRequestException);
    expect(producersRepository.createProducer).not.toHaveBeenCalled();
  });

  it("should create producer successfully if document is unique", async () => {
    producersRepository.getProducerByDocument.mockResolvedValueOnce(null);
    producersRepository.createProducer.mockResolvedValueOnce(fakeProducerEntity);

    const result = await createOrUpdateProducerService.execute(createProducerDto);

    expect(producersRepository.getProducerByDocument).toHaveBeenCalledWith(
      createProducerDto.document,
      createProducerDto.typeDocument
    );
    expect(producersRepository.createProducer).toHaveBeenCalledWith(createProducerDto);
    expect(result).toEqual(fakeProducerEntity);
  });
});
