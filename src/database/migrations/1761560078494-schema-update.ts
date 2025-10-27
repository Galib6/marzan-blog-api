import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1761560078494 implements MigrationInterface {
  name = 'SchemaUpdate1761560078494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "banners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "articleId" uuid NOT NULL, "orderPriority" integer DEFAULT '0', CONSTRAINT "REL_ac7dfbdc3764d3fc666dcf92af" UNIQUE ("articleId"), CONSTRAINT "PK_e9b186b959296fcb940790d31c3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_5527f43faf4977ab7386f0b7872" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_ac7dfbdc3764d3fc666dcf92afb" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_ac7dfbdc3764d3fc666dcf92afb"`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_5527f43faf4977ab7386f0b7872"`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c"`
    );
    await queryRunner.query(`DROP TABLE "banners"`);
  }
}
