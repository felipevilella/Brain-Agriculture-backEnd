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
  @IsString()
  @MinLength(11, { message: "Document must be at least 11 characters long" })
  @Validate(IsValidCpfOrCnpjConstraint)
  document: string;

  @IsNotEmpty()
  @IsEnum(TYPE_DOCUMENT, {
    message: `State must be one of the following: ${Object.values(TYPE_DOCUMENT).join(", ")}`,
  })
  typeDocument: TYPE_DOCUMENT;
}

export class UpdateProducerDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: "city must be at least 3 characters long",
  })
  @IsOptional()
  city: string;

  @IsNotEmpty()
  @IsEnum(STATES_TYPE, {
    message: `State must be one of the following: ${Object.values(STATES_TYPE).join(", ")}`,
  })
  @IsOptional()
  states: STATES_TYPE;

  @IsNotEmpty()
  @IsString()
  @MinLength(11, { message: "Document must be at least 11 characters long" })
  @Validate(IsValidCpfOrCnpjConstraint)
  @IsOptional()
  document: string;

  @IsNotEmpty()
  @IsEnum(TYPE_DOCUMENT, {
    message: `State must be one of the following: ${Object.values(TYPE_DOCUMENT).join(", ")}`,
  })
  @IsOptional()
  typeDocument: TYPE_DOCUMENT;
}

export class IProducerDto {
  id: string;
  name: string;
  city: string;
  states: STATES_TYPE;
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
  states: STATES_TYPE;
  document: string;
  typeDocument: TYPE_DOCUMENT;
  farms?: IFarmMapper[];
}
