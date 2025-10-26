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
import { CreateAuthorDTO } from "../../dtos/create.dto";
import { FilterAuthorDTO } from "../../dtos/filter.dto";
import { UpdateAuthorDTO } from "../../dtos/update.dto";
import { Author } from "../../entities/author.entity";
import { AuthorService } from "../../services/author.service";

@ApiTags("Authors")
@ApiBearerAuth()
@Controller("internal/author")
export class InternalAuthorController {
  RELATIONS = [];

  constructor(private readonly service: AuthorService) {}

  @Get()
  async findAll(
    @Query() query: FilterAuthorDTO
  ): Promise<SuccessResponse | Author[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(":id")
  async findById(@Param("id") id: number): Promise<Author> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(
    @Body() body: CreateAuthorDTO,
    @ActiveUser() authUser: IActiveUser
  ): Promise<Author> {
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  @Patch(":id")
  async updateOne(
    @Param("id") id: number,
    @Body() body: UpdateAuthorDTO
  ): Promise<Author> {
    return this.service.updateOneBase(id, body);
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: number): Promise<SuccessResponse> {
    return this.service.softDeleteOneBase(id);
  }
}
