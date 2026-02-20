import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1771611058793 implements MigrationInterface {
  name = 'SchemaUpdate1771611058793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "topics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, "title" character varying(500), "description" text, "slug" character varying NOT NULL, "orderPriority" integer DEFAULT '0', CONSTRAINT "UQ_97c66ab0029f49fde30517f8199" UNIQUE ("slug"), CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_f511a2b28e4acd2b481f79e55c" ON "topics" ("title") `);
    await queryRunner.query(
      `CREATE TABLE "articles_topics_topics" ("articlesId" uuid NOT NULL, "topicsId" uuid NOT NULL, CONSTRAINT "PK_0474251531b86130a07abda0ae8" PRIMARY KEY ("articlesId", "topicsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_79d908acf209472e6c8e7a9dc5" ON "articles_topics_topics" ("articlesId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9521824f1fa35fa7a6b569d5c0" ON "articles_topics_topics" ("topicsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "topics" ADD CONSTRAINT "FK_855dd59bba6329bde6f94117cc7" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "topics" ADD CONSTRAINT "FK_352e7fb88c5ab6add4bef2f4648" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" ADD CONSTRAINT "FK_79d908acf209472e6c8e7a9dc59" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" ADD CONSTRAINT "FK_9521824f1fa35fa7a6b569d5c0d" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" DROP CONSTRAINT "FK_9521824f1fa35fa7a6b569d5c0d"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_topics_topics" DROP CONSTRAINT "FK_79d908acf209472e6c8e7a9dc59"`
    );
    await queryRunner.query(
      `ALTER TABLE "topics" DROP CONSTRAINT "FK_352e7fb88c5ab6add4bef2f4648"`
    );
    await queryRunner.query(
      `ALTER TABLE "topics" DROP CONSTRAINT "FK_855dd59bba6329bde6f94117cc7"`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_9521824f1fa35fa7a6b569d5c0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_79d908acf209472e6c8e7a9dc5"`);
    await queryRunner.query(`DROP TABLE "articles_topics_topics"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f511a2b28e4acd2b481f79e55c"`);
    await queryRunner.query(`DROP TABLE "topics"`);
  }
}
