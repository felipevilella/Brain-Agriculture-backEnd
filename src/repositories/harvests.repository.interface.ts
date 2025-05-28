export interface IHarvestsRepository {
  deleteByFarmId:(farmId: string) => Promise<void>
}