import { MigrationInterface, QueryRunner } from "typeorm";

export class userTable1643372577270 implements MigrationInterface {
  name = "userTable1643372577270";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "createdOn" character varying NOT NULL, "updatedOn" character varying NOT NULL, "uuid" character varying NOT NULL, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
