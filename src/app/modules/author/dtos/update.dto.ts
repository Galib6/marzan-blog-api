import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateAuthorDTO } from "./create.dto";

export class UpdateAuthorDTO extends PartialType(
  OmitType(CreateAuthorDTO, ["createdBy"])
) {
  @IsOptional()
  @IsNumber()
  readonly updatedBy!: any;
}
