import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InternalBannerController } from "./controllers/internal/banner.internal.controller";
import { Banner } from "./entities/banner.entity";
import { BannerService } from "./services/banner.service";

const entities = [Banner];
const services = [BannerService];
const subscribers = [];
const controllers = [];
const webControllers = [];
const internalControllers = [InternalBannerController];
const modules = [];

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services, ...subscribers],
  exports: [...services, ...subscribers],
  controllers: [...controllers, ...webControllers, ...internalControllers],
})
export class BannerModule {}
