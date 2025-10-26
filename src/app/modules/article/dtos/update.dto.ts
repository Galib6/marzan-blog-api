import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateArticleDTO } from "./create.dto";

export class UpdateArticleDTO extends PartialType(
  OmitType(CreateArticleDTO, ["createdBy"])
) {
  @IsOptional()
  @IsNumber()
  readonly updatedBy!: any;
}
