import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1761331842695 implements MigrationInterface {
  name = 'SchemaUpdate1761331842695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "roleId" uuid, "userId" uuid, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "fullName" character varying, "avatar" character varying, "phoneNumber" character varying, "username" character varying, "email" character varying, "password" character varying, "authProvider" character varying, "isVerified" character varying NOT NULL DEFAULT false, "isActive" boolean DEFAULT true, "createdById" uuid, "updatedById" uuid, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "file_storages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "storageType" character varying(50) NOT NULL, "fileType" character varying(100) NOT NULL, "folder" character varying(256) NOT NULL, "fileName" character varying(256) NOT NULL, "link" character varying(256), "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_f33772005f420b3ad10dacc2079" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "auth_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "phoneNumber" character varying, "otp" integer, "otpExpiryAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, CONSTRAINT "UQ_6b663b5cb7f3580dcff3acad56d" UNIQUE ("phoneNumber"), CONSTRAINT "PK_53274b28e95e8565b5b34990060" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permission_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "createdById" uuid, "updatedById" uuid, "permissionTypeId" uuid, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, "roleId" uuid, "permissionId" uuid, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))`
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "permission_types"`);
    await queryRunner.query(`DROP TABLE "auth_stats"`);
    await queryRunner.query(`DROP TABLE "file_storages"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
