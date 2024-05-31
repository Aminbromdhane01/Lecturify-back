import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableToUserAttributes1717169392362 implements MigrationInterface {
    name = 'AddNullableToUserAttributes1717169392362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`picture\` \`picture\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`adress\` \`adress\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`adress\` \`adress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`picture\` \`picture\` varchar(255) NOT NULL`);
    }

}
