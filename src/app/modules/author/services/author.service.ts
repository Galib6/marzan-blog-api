import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@src/app/base/base.service";
import { Repository } from "typeorm";
import { CategoryService } from "../../category/services/category.service";
import { Author } from "../entities/author.entity";

@Injectable()
export class AuthorService extends BaseService<Author> {
  constructor(
    @InjectRepository(Author)
    public readonly _repo: Repository<Author>,
    // private readonly dataSource: DataSource
    private readonly categoryService: CategoryService
  ) {
    super(_repo);
  }
}
