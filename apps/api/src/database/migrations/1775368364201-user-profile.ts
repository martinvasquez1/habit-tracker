import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfile1775368364201 implements MigrationInterface {
    name = 'UserProfile1775368364201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "bio" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicture" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "coverPhoto" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coverPhoto"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
    }

}
