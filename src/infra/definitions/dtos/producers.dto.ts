import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { STATES_TYPE } from "src/infra/definitions/localizations.type";
import { TYPE_DOCUMENT } from "src/infra/definitions/producers.type";
import { IFarmDto, IFarmMapper } from "./farms.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


@ValidatorConstraint({ name: "IsValidCpfOrCnpj", async: false })
export class IsValidCpfOrCnpjConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments): boolean {
    const obj = args.object as any;

    if (obj.typeDocument === TYPE_DOCUMENT.CPF) {
      return cpf.isValid(value);
    }

    if (obj.typeDocument === TYPE_DOCUMENT.CNPJ) {
      return cnpj.isValid(value);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const obj = args.object as any;
    if (obj.typeDocument === TYPE_DOCUMENT.CPF)
      return "This CPF is Invalid number";
    if (obj.typeDocument === TYPE_DOCUMENT.CNPJ)
      return "This CNPJ is Invalid number";

    return "Invalid document ";
  }
}

export class CreateProducerDto {
  @ApiProperty({
    example: "John Doe",
    description: "Full name of the producer",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Belo Horizonte",
    description: "City where the producer is located",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: "city must be at least 3 characters long",
  })
  city: string;

  @ApiProperty({
    example: "MG",
    description: `State where the producer is located. Must be one of: ${Object.values(STATES_TYPE).join(", ")}`,
    enum: STATES_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(STATES_TYPE, {
    message: `State must be one of the following: ${Object.values(STATES_TYPE).join(", ")}`,
  })
  state: STATES_TYPE;

  @ApiProperty({
    example: cpf.generate(),
    description: "CPF or CNPJ document number of the producer (only numbers)",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(11, { message: "Document must be at least 11 characters long" })
  @Validate(IsValidCpfOrCnpjConstraint)
  document: string;

  @ApiProperty({
    example: "CPF",
    description: `Type of document. Must be one of: ${Object.values(TYPE_DOCUMENT).join(", ")}`,
    enum: TYPE_DOCUMENT,
  })
  @IsNotEmpty()
  @IsEnum(TYPE_DOCUMENT, {
    message: `TypeDocument must be one of the following: ${Object.values(TYPE_DOCUMENT).join(", ")}`,
  })
  typeDocument: TYPE_DOCUMENT;
}

export class UpdateProducerDto {
  @ApiPropertyOptional({
    example: 'Jane Doe',
    description: 'Full name of the producer',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    example: 'São Paulo',
    description: 'City where the producer is located',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'city must be at least 3 characters long',
  })
  @IsOptional()
  city: string;

  @ApiPropertyOptional({
    example: 'SP',
    description: `State where the producer is located. Must be one of: ${Object.values(STATES_TYPE).join(', ')}`,
    enum: STATES_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(STATES_TYPE, {
    message: `State must be one of the following: ${Object.values(STATES_TYPE).join(', ')}`,
  })
  @IsOptional()
  state: STATES_TYPE;

  @ApiPropertyOptional({
    example: cpf.generate(),
    description: 'CPF or CNPJ document number of the producer (only numbers)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(11, { message: 'Document must be at least 11 characters long' })
  @Validate(IsValidCpfOrCnpjConstraint)
  @IsOptional()
  document: string;

  @ApiPropertyOptional({
    example: 'CPF',
    description: `Type of document. Must be one of: ${Object.values(TYPE_DOCUMENT).join(', ')}`,
    enum: TYPE_DOCUMENT,
  })
  @IsNotEmpty()
  @IsEnum(TYPE_DOCUMENT, {
    message: `TypeDocument must be one of the following: ${Object.values(TYPE_DOCUMENT).join(', ')}`,
  })
  @IsOptional()
  typeDocument: TYPE_DOCUMENT;
}

export class IProducerDto {
  id: string;
  name: string;
  city: string;
  state: STATES_TYPE;
  document: string;
  typeDocument: TYPE_DOCUMENT;
  farms?: IFarmDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class IProducerMapper {
  id: string;
  name: string;
  city: string;
  state: STATES_TYPE;
  document: string;
  typeDocument: TYPE_DOCUMENT;
  farms?: IFarmMapper[];
}
