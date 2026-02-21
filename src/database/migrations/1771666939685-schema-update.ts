import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1771666939685 implements MigrationInterface {
  name = 'SchemaUpdate1771666939685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" DROP CONSTRAINT "FK_d69c4c523152c22941ed15738ba"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" DROP CONSTRAINT "FK_9521824f1fa35fa7a6b569d5c0d"`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_50e6a1e8294da56bfc62ff9e1e"`);
    await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "name" TO "isFeatured"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "isFeatured"`);
    await queryRunner.query(`ALTER TABLE "articles" ADD "isFeatured" boolean DEFAULT true`);
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" ADD CONSTRAINT "FK_d69c4c523152c22941ed15738ba" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" ADD CONSTRAINT "FK_9521824f1fa35fa7a6b569d5c0d" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" DROP CONSTRAINT "FK_9521824f1fa35fa7a6b569d5c0d"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" DROP CONSTRAINT "FK_d69c4c523152c22941ed15738ba"`
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "isFeatured"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "isFeatured" character varying(256) NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "isFeatured" TO "name"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_50e6a1e8294da56bfc62ff9e1e" ON "articles" ("name") `
    );
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" ADD CONSTRAINT "FK_9521824f1fa35fa7a6b569d5c0d" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" ADD CONSTRAINT "FK_d69c4c523152c22941ed15738ba" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
