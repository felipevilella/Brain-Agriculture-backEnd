import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { CROPY_TYPES } from "src/infra/definitions/crops.type";
import { STATES_TYPE } from "src/infra/definitions/localizations.type";

export class CreateCropDto {
  @IsNotEmpty()
  @IsEnum(CROPY_TYPES, {
    message: `Crop must be one of the following: ${Object.values(CROPY_TYPES).join(", ")}`,
  })
  name: CROPY_TYPES;
}

export class CreateHarvestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDto)
  crops: CreateCropDto[];
}

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  producerId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: "city must be at least 3 characters long",
  })
  city: string;

  @IsNotEmpty()
  @IsEnum(STATES_TYPE, {
    message: `State must be one of the following: ${Object.values(STATES_TYPE).join(", ")}`,
  })
  states: STATES_TYPE;

  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @IsNotEmpty()
  @IsNumber()
  arableArea: number;

  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestDto)
  harvests: CreateHarvestDto[];
}

export interface ICropDto {
  id: string;
  name: CROPY_TYPES;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHarvestDto {
  id: string;
  name: string;
  year: number;
  crops?: ICropDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFarmDto {
  id: string;
  producerId: string;
  name: string;
  city: string;
  states: STATES_TYPE;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  harvests?: IHarvestDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITotalFarmByStateDto {
  state: string;
  count: number;
}

export interface ITotalArableVegetationDto {
  arableArea: number;
  vegetationArea: number;
}

export interface IFarmMapper {
  id: string;
  producerId: string;
  name: string;
  city: string;
  states: STATES_TYPE;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  harvests?: IHarvestDto[];
}
