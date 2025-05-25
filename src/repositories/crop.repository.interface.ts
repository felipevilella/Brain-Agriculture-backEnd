import { ITotalCropNameDto } from "src/infra/definitions/dtos/crop.dtos";

export interface ICropRepository {
  getTotalCropByName:() => Promise<ITotalCropNameDto[]>
}

