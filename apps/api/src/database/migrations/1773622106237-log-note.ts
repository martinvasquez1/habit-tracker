import { MigrationInterface, QueryRunner } from "typeorm";

export class LogNote1773622106237 implements MigrationInterface {
    name = 'LogNote1773622106237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" ADD "note" text`);
        await queryRunner.query(`ALTER TABLE "habit" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "habit" DROP COLUMN "color"`);
        await queryRunner.query(`CREATE TYPE "public"."habit_color_enum" AS ENUM('red', 'orange', 'yellow', 'green', 'mint', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'brown', 'gray')`);
        await queryRunner.query(`ALTER TABLE "habit" ADD "color" "public"."habit_color_enum" NOT NULL DEFAULT 'blue'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" DROP COLUMN "color"`);
        await queryRunner.query(`DROP TYPE "public"."habit_color_enum"`);
        await queryRunner.query(`ALTER TABLE "habit" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "habit" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "note"`);
    }

}
