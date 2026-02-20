import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1770830653100 implements MigrationInterface {
  name = 'SchemaUpdate1770830653100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_a6ada6f4dcf60db496fe71d7a96"`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_090b4acad1cc10daa2002367431"`
    );
    await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c"`
    );
    await queryRunner.query(`ALTER TABLE "banners" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "file_storages" DROP CONSTRAINT "FK_ff768cac9286a816365d362c008"`
    );
    await queryRunner.query(`ALTER TABLE "file_storages" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "authors" DROP CONSTRAINT "FK_95fdc641fc09b916e30ff0c2ca9"`
    );
    await queryRunner.query(`ALTER TABLE "authors" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "auth_stats" DROP CONSTRAINT "FK_1379a375c2a84b413b89c996d07"`
    );
    await queryRunner.query(`ALTER TABLE "auth_stats" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "permission_types" DROP CONSTRAINT "FK_c5a53b0dec56384fb565b874fff"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" ALTER COLUMN "createdById" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_9c62bef7488ad2f934e0a52a1ed"`
    );
    await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "createdById" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_e57d242f2e93a522a00fb9be970"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ALTER COLUMN "createdById" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_a6ada6f4dcf60db496fe71d7a96" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_090b4acad1cc10daa2002367431" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "file_storages" ADD CONSTRAINT "FK_ff768cac9286a816365d362c008" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ADD CONSTRAINT "FK_95fdc641fc09b916e30ff0c2ca9" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "auth_stats" ADD CONSTRAINT "FK_1379a375c2a84b413b89c996d07" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" ADD CONSTRAINT "FK_c5a53b0dec56384fb565b874fff" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_9c62bef7488ad2f934e0a52a1ed" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_e57d242f2e93a522a00fb9be970" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_e57d242f2e93a522a00fb9be970"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_9c62bef7488ad2f934e0a52a1ed"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" DROP CONSTRAINT "FK_c5a53b0dec56384fb565b874fff"`
    );
    await queryRunner.query(
      `ALTER TABLE "auth_stats" DROP CONSTRAINT "FK_1379a375c2a84b413b89c996d07"`
    );
    await queryRunner.query(
      `ALTER TABLE "authors" DROP CONSTRAINT "FK_95fdc641fc09b916e30ff0c2ca9"`
    );
    await queryRunner.query(
      `ALTER TABLE "file_storages" DROP CONSTRAINT "FK_ff768cac9286a816365d362c008"`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_090b4acad1cc10daa2002367431"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_a6ada6f4dcf60db496fe71d7a96"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ALTER COLUMN "createdById" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_e57d242f2e93a522a00fb9be970" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_9c62bef7488ad2f934e0a52a1ed" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" ALTER COLUMN "createdById" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" ADD CONSTRAINT "FK_c5a53b0dec56384fb565b874fff" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "auth_stats" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "auth_stats" ADD CONSTRAINT "FK_1379a375c2a84b413b89c996d07" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "authors" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "authors" ADD CONSTRAINT "FK_95fdc641fc09b916e30ff0c2ca9" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "file_storages" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "file_storages" ADD CONSTRAINT "FK_ff768cac9286a816365d362c008" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "banners" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "banners" ADD CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_090b4acad1cc10daa2002367431" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdById" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_a6ada6f4dcf60db496fe71d7a96" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
