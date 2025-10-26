import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateBannerDTO } from "./create.dto";

export class UpdateBannerDTO extends PartialType(
  OmitType(CreateBannerDTO, ["createdBy"])
) {
  @IsOptional()
  @IsNumber()
  readonly updatedBy!: any;
}
