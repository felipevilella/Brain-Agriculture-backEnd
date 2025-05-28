import { BadRequestException } from "@nestjs/common";
import {
  createFakeProducer,
  createFakeProducerResponse,
} from "../producer.mock";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { CreateOrUpdateProducerService } from "src/module/producers/services/createOrUpdateProducer.services";
import { ProducerMapper } from "src/module/producers/mapper/producers.mapper";

describe("CreateOrUpdateProducerService", () => {
  const createProducerDto = createFakeProducer();
  const fakeProducerEntity = createFakeProducerResponse();
  const updateProducerDto = { ...createProducerDto, name: "Updated Name" };

  const producersRepository = {
    getProducerByDocument: jest.fn(),
    createProducer: jest.fn(),
    getProducerById: jest.fn(),
    updateProducer: jest.fn(),
  };

  const service = new CreateOrUpdateProducerService(
    producersRepository as unknown as ProducersRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be instantiable", () => {
    expect(service).toBeInstanceOf(CreateOrUpdateProducerService);
    expect(service.execute).toBeInstanceOf(Function);
  });

  it("should throw BadRequest if document already exists on create", async () => {
    producersRepository.getProducerByDocument.mockResolvedValueOnce(
      fakeProducerEntity
    );

    await expect(service.execute(createProducerDto)).rejects.toThrow(
      BadRequestException
    );
    expect(producersRepository.createProducer).not.toHaveBeenCalled();
  });

  it("should create producer successfully", async () => {
    producersRepository.getProducerByDocument.mockResolvedValueOnce(null);
    producersRepository.createProducer.mockResolvedValueOnce(
      fakeProducerEntity
    );

    const result = await service.execute(createProducerDto);

    expect(producersRepository.createProducer).toHaveBeenCalledWith(
      createProducerDto
    );
    expect(result).toEqual(fakeProducerEntity);
  });

  it("should throw BadRequest if producer to update does not exist", async () => {
    producersRepository.getProducerById.mockResolvedValueOnce(undefined);

    await expect(
      service.execute(updateProducerDto, fakeProducerEntity.id)
    ).rejects.toThrow(BadRequestException);
    expect(producersRepository.updateProducer).not.toHaveBeenCalled();
  });

  it("should throw BadRequest if document is changed and already used", async () => {
    const newDocument = "99999999999";
    const conflictingProducer = createFakeProducerResponse();

    producersRepository.getProducerById.mockResolvedValueOnce(
      fakeProducerEntity
    );
    producersRepository.getProducerByDocument.mockResolvedValueOnce(
      conflictingProducer
    );

    await expect(
      service.execute(
        { ...updateProducerDto, document: newDocument },
        fakeProducerEntity.id
      )
    ).rejects.toThrow(BadRequestException);
    expect(producersRepository.updateProducer).not.toHaveBeenCalled();
  });
});
