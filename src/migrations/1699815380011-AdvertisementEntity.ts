import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdvertisementEntity1699815380011 implements MigrationInterface {
  name = 'AdvertisementEntity1699815380011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "year" smallint NOT NULL, "price" numeric NOT NULL, "currency" character varying NOT NULL DEFAULT 'UAH', "city" character varying(40) NOT NULL, "status" character varying NOT NULL DEFAULT 'draft', "views" smallint NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "brandId" uuid, "modelId" uuid, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" ADD CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" ADD CONSTRAINT "FK_9278122b722a8ee8d11327253ee" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" ADD CONSTRAINT "FK_a4776e1997896cdf9c72cf8617d" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisement" DROP CONSTRAINT "FK_a4776e1997896cdf9c72cf8617d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" DROP CONSTRAINT "FK_9278122b722a8ee8d11327253ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" DROP CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db"`,
    );
    await queryRunner.query(`DROP TABLE "advertisement"`);
  }
}
