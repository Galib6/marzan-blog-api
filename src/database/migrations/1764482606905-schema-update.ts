import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1764482606905 implements MigrationInterface {
  name = 'SchemaUpdate1764482606905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "fullName" character varying, "avatar" character varying, "phoneNumber" character varying, "username" character varying, "email" character varying, "password" character varying, "authProvider" character varying, "isVerified" character varying NOT NULL DEFAULT false, "createdById" uuid, "updatedById" uuid, "isActive" boolean DEFAULT true, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "file_storages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "storageType" character varying(50) NOT NULL, "fileType" character varying(100) NOT NULL, "folder" character varying(256) NOT NULL, "fileName" character varying(256) NOT NULL, "link" character varying(256), CONSTRAINT "PK_f33772005f420b3ad10dacc2079" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "title" character varying(500), "description" text, "slug" character varying NOT NULL, "orderPriority" integer DEFAULT '0', CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa79448dc3e959720ab4c13651" ON "categories" ("title") `
    );
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "title" character varying(500), "name" character varying(256) NOT NULL, "summary" character varying NOT NULL, "thumb" character varying(256) NOT NULL, "content" jsonb NOT NULL, "slug" character varying NOT NULL, "orderPriority" integer DEFAULT '0', CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c28437db9b5137136e1f6d609" ON "articles" ("title") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50e6a1e8294da56bfc62ff9e1e" ON "articles" ("name") `
    );
    await queryRunner.query(
      `CREATE TABLE "banners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "articleId" uuid NOT NULL, "orderPriority" integer DEFAULT '0', CONSTRAINT "REL_ac7dfbdc3764d3fc666dcf92af" UNIQUE ("articleId"), CONSTRAINT "PK_e9b186b959296fcb940790d31c3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "name" character varying(256) NOT NULL, "type" character varying(256) NOT NULL, "fb" character varying(256), "whatsapp" character varying(256), "linkedin" character varying(256), "youtube" character varying(256), "description" text, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_6c64b3df09e6774438aeca7e0b" ON "authors" ("name") `);
    await queryRunner.query(
      `CREATE TABLE "auth_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "phoneNumber" character varying, "otp" integer, "otpExpiryAt" TIMESTAMP, CONSTRAINT "UQ_6b663b5cb7f3580dcff3acad56d" UNIQUE ("phoneNumber"), CONSTRAINT "PK_53274b28e95e8565b5b34990060" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permission_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "title" character varying NOT NULL, CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "title" character varying NOT NULL, "permissionTypeId" uuid NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid NOT NULL, "updatedById" uuid, "roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "articles_categories_categories" ("articlesId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_d99e5b5140f980c6e7b63fc1f16" PRIMARY KEY ("articlesId", "categoriesId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c28108e84d0948e9567d29e40" ON "articles_categories_categories" ("articlesId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d69c4c523152c22941ed15738b" ON "articles_categories_categories" ("categoriesId") `
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_cec119ce18936c7b6c24142be3e" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_5de46381983d514c100aaceb542" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_51d635f1d983d505fb5a2f44c52" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_52e97c477859f8019f3705abd21" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "file_storages" ADD CONSTRAINT "FK_ff768cac9286a816365d362c008" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "file_storages" ADD CONSTRAINT "FK_f24c5f66163fa19895cc77f79da" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_a6ada6f4dcf60db496fe71d7a96" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_e8221f562fcc5898e530aa1be6e" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_090b4acad1cc10daa2002367431" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_07881bdb2ef80ecd990b1d3228b" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE "authors" ADD CONSTRAINT "FK_95fdc641fc09b916e30ff0c2ca9" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ADD CONSTRAINT "FK_493e38a5f6437081eb8b0bb80fa" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "auth_stats" ADD CONSTRAINT "FK_1379a375c2a84b413b89c996d07" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "auth_stats" ADD CONSTRAINT "FK_ffac65e747706bbbe3e30df645a" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" ADD CONSTRAINT "FK_c5a53b0dec56384fb565b874fff" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" ADD CONSTRAINT "FK_ffc419a7b4f4eb9f2a83cd12c5d" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_9c62bef7488ad2f934e0a52a1ed" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_3ec888a96330ca53ded73988c92" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_2654e4ea4199133ea4ad592b7a8" FOREIGN KEY ("permissionTypeId") REFERENCES "permission_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_e57d242f2e93a522a00fb9be970" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_a8ecd7142bbeea2cd67c942c6ef" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" ADD CONSTRAINT "FK_9c28108e84d0948e9567d29e400" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" ADD CONSTRAINT "FK_d69c4c523152c22941ed15738ba" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" DROP CONSTRAINT "FK_d69c4c523152c22941ed15738ba"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" DROP CONSTRAINT "FK_9c28108e84d0948e9567d29e400"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_a8ecd7142bbeea2cd67c942c6ef"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_e57d242f2e93a522a00fb9be970"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_2654e4ea4199133ea4ad592b7a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_3ec888a96330ca53ded73988c92"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_9c62bef7488ad2f934e0a52a1ed"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" DROP CONSTRAINT "FK_ffc419a7b4f4eb9f2a83cd12c5d"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_types" DROP CONSTRAINT "FK_c5a53b0dec56384fb565b874fff"`
    );
    await queryRunner.query(
      `ALTER TABLE "auth_stats" DROP CONSTRAINT "FK_ffac65e747706bbbe3e30df645a"`
    );
    await queryRunner.query(
      `ALTER TABLE "auth_stats" DROP CONSTRAINT "FK_1379a375c2a84b413b89c996d07"`
    );
    await queryRunner.query(
      `ALTER TABLE "authors" DROP CONSTRAINT "FK_493e38a5f6437081eb8b0bb80fa"`
    );
    await queryRunner.query(
      `ALTER TABLE "authors" DROP CONSTRAINT "FK_95fdc641fc09b916e30ff0c2ca9"`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_ac7dfbdc3764d3fc666dcf92afb"`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_5527f43faf4977ab7386f0b7872"`
    );
    await queryRunner.query(
      `ALTER TABLE "banners" DROP CONSTRAINT "FK_202bbd0a5e0aab936058a5ffe2c"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_07881bdb2ef80ecd990b1d3228b"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_090b4acad1cc10daa2002367431"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_e8221f562fcc5898e530aa1be6e"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_a6ada6f4dcf60db496fe71d7a96"`
    );
    await queryRunner.query(
      `ALTER TABLE "file_storages" DROP CONSTRAINT "FK_f24c5f66163fa19895cc77f79da"`
    );
    await queryRunner.query(
      `ALTER TABLE "file_storages" DROP CONSTRAINT "FK_ff768cac9286a816365d362c008"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_52e97c477859f8019f3705abd21"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_51d635f1d983d505fb5a2f44c52"`);
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_5de46381983d514c100aaceb542"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_cec119ce18936c7b6c24142be3e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d69c4c523152c22941ed15738b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9c28108e84d0948e9567d29e40"`);
    await queryRunner.query(`DROP TABLE "articles_categories_categories"`);
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "permission_types"`);
    await queryRunner.query(`DROP TABLE "auth_stats"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6c64b3df09e6774438aeca7e0b"`);
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`DROP TABLE "banners"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_50e6a1e8294da56bfc62ff9e1e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3c28437db9b5137136e1f6d609"`);
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_aa79448dc3e959720ab4c13651"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "file_storages"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
