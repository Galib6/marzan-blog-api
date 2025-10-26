import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ActiveUser } from "@src/app/decorators";
import { IActiveUser } from "@src/app/decorators/active-user.decorator";
import { SuccessResponse } from "@src/app/types";
import { CreateBannerDTO } from "../../dtos/create.dto";
import { FilterBannerDTO } from "../../dtos/filter.dto";
import { UpdateBannerDTO } from "../../dtos/update.dto";
import { Banner } from "../../entities/banner.entity";
import { BannerService } from "../../services/banner.service";

@ApiTags("Banner")
@ApiBearerAuth()
@Controller("internal/banners")
export class InternalBannerController {
  RELATIONS = [];

  constructor(private readonly service: BannerService) {}

  @Get()
  async findAll(
    @Query() query: FilterBannerDTO
  ): Promise<SuccessResponse | Banner[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(":id")
  async findById(@Param("id") id: number): Promise<Banner> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(
    @Body() body: CreateBannerDTO,
    @ActiveUser() authUser: IActiveUser
  ): Promise<Banner> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  @Patch(":id")
  async updateOne(
    @Param("id") id: number,
    @Body() body: UpdateBannerDTO
  ): Promise<Banner> {
    return this.service.updateOneBase(id, body, { relations: this.RELATIONS });
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: number): Promise<SuccessResponse> {
    return this.service.softDeleteOneBase(id);
  }
}
