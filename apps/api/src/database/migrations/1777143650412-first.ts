import { MigrationInterface, QueryRunner } from "typeorm";

export class First1777143650412 implements MigrationInterface {
    name = 'First1777143650412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."log_status_enum" AS ENUM('completed', 'skipped', 'missed')`);
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "date" date NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."log_status_enum" NOT NULL DEFAULT 'missed', "note" text, "habitId" integer, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."habit_color_enum" AS ENUM('red', 'orange', 'yellow', 'green', 'mint', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'brown', 'gray')`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "icon" character varying, "color" "public"."habit_color_enum" NOT NULL, "isArchived" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_71654d5d0512043db43bac9abfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'basic')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "bio" character varying, "profilePicture" text, "coverPhoto" text, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_89123057f24bee328140b3b1227" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habit" ADD CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" DROP CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_89123057f24bee328140b3b1227"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`DROP TYPE "public"."habit_color_enum"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TYPE "public"."log_status_enum"`);
    }

}
