import { listFakerProducer } from "../producer.mock";
import { ProducersRepository } from "src/infra/repositories/producers.repository";
import { ListProducerService } from "src/module/producers/services/listProducers.service";

describe("ListProducerService", () => {
  const fakeListProducerEntity = listFakerProducer();

  const producersRepository = {
    listProducers: jest.fn(),
  };

  const listProducerService = new ListProducerService(
    producersRepository as unknown as ProducersRepository
  );

  it("should be instantiable", () => {
    expect(listProducerService).toBeInstanceOf(ListProducerService);
    expect(listProducerService.execute).toBeInstanceOf(Function);
    expect(listProducerService.execute).toBe(ListProducerService.prototype.execute);
  });

  it("should list producer successfully", async () => {
    producersRepository.listProducers.mockResolvedValueOnce(fakeListProducerEntity);
    const result = await listProducerService.execute();

    expect(result).toEqual(fakeListProducerEntity);
  });
});
