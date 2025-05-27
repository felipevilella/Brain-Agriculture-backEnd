import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { CROPY_TYPES } from "src/infra/definitions/crops.type";
import { STATES_TYPE } from "src/infra/definitions/localizations.type";

export class CreateCropDto {
  @ApiProperty({
    description: `Crop name. Must be one of: ${Object.values(CROPY_TYPES).join(', ')}`,
    enum: CROPY_TYPES,
    example: CROPY_TYPES.SOYBEAN,
  })
  @IsNotEmpty()
  @IsEnum(CROPY_TYPES, {
    message: `Crop must be one of the following: ${Object.values(CROPY_TYPES).join(', ')}`,
  })
  name: CROPY_TYPES;
}

export class CreateHarvestDto {
  @ApiProperty({
    description: 'Name of the harvest season',
    example: '2025 Season 1',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Year of the harvest',
    example: 2025,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    description: 'List of crops included in the harvest',
    type: [CreateCropDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDto)
  crops?: CreateCropDto[];
}

export class CreateFarmDto {
  @ApiProperty({
    description: 'Producer ID',
    example: 'ed4448f6-6594-45e2-ba84-e961b220b103',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  producerId: string;

  @ApiProperty({
    description: 'Farm name',
    example: 'Green Valley Farm',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'City where the farm is located',
    example: 'Springfield',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'city must be at least 3 characters long',
  })
  city: string;

  @ApiProperty({
    description: `State where the farm is located. Must be one of: ${Object.values(STATES_TYPE).join(', ')}`,
    enum: STATES_TYPE,
    example: STATES_TYPE.MG,
  })
  @IsNotEmpty()
  @IsEnum(STATES_TYPE, {
    message: `State must be one of the following: ${Object.values(STATES_TYPE).join(', ')}`,
  })
  state: STATES_TYPE;

  @ApiProperty({
    description: 'Total area of the farm (in hectares)',
    example: 1500,
  })
  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @ApiProperty({
    description: 'Arable area of the farm (in hectares)',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  arableArea: number;

  @ApiProperty({
    description: 'Vegetation area of the farm (in hectares)',
    example: 500,
  })
  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @ApiPropertyOptional({
    description: 'List of harvests associated with the farm',
    type: [CreateHarvestDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestDto)
  harvests?: CreateHarvestDto[];
}


export interface ICropDto {
  id: string;
  name: CROPY_TYPES;
}

export interface IHarvestDto {
  id: string;
  name: string;
  year: number;
  crops?: ICropDto[];
}

export interface IFarmDto {
  id: string;
  producerId: string;
  name: string;
  city: string;
  state: STATES_TYPE;
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
  state: STATES_TYPE;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  harvests?: IHarvestDto[];
}
