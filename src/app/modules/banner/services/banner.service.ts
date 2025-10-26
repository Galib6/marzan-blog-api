import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@src/app/base/base.service";
import { Repository } from "typeorm";
import { Banner } from "../entities/banner.entity";

@Injectable()
export class BannerService extends BaseService<Banner> {
  constructor(
    @InjectRepository(Banner)
    public readonly _repo: Repository<Banner>
    // private readonly dataSource: DataSource
  ) {
    super(_repo);
  }
}
