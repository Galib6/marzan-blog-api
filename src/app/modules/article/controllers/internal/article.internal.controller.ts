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
import { CreateArticleDTO } from "../../dtos/create.dto";
import { FilterArticleDTO } from "../../dtos/filter.dto";
import { UpdateArticleDTO } from "../../dtos/update.dto";
import { Article } from "../../entities/article.entity";
import { ArticleService } from "../../services/article.service";

@ApiTags("Articles")
@ApiBearerAuth()
@Controller("internal/articles")
export class InternalArticleController {
  RELATIONS = ["categories"];

  constructor(private readonly service: ArticleService) {}

  @Get()
  async findAll(
    @Query() query: FilterArticleDTO
  ): Promise<SuccessResponse | Article[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(":id")
  async findById(@Param("id") id: number): Promise<Article> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(
    @Body() body: CreateArticleDTO,
    @ActiveUser() authUser: IActiveUser
  ): Promise<Article> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  @Patch(":id")
  async updateOne(
    @Param("id") id: number,
    @Body() body: UpdateArticleDTO
  ): Promise<Article> {
    return this.service.updateOne(id, body);
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: number): Promise<SuccessResponse> {
    return this.service.softDeleteOneBase(id);
  }
}
