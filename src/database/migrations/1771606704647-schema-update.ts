import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1771606704647 implements MigrationInterface {
  name = 'SchemaUpdate1771606704647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "content" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "content" SET NOT NULL`);
  }
}
