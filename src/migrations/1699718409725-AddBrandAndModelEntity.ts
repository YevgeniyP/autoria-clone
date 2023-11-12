import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBrandAndModelEntity1699718409725 implements MigrationInterface {
  name = 'AddBrandAndModelEntity1699718409725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, CONSTRAINT "UQ_1582bfd88329b634a25e6e3d904" UNIQUE ("title"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "brandId" uuid, CONSTRAINT "UQ_66f99c2ad15888c3c40af795748" UNIQUE ("title"), CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_7996700d600159cdf20dc0d0816" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_7996700d600159cdf20dc0d0816"`,
    );
    await queryRunner.query(`DROP TABLE "model"`);
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
