import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDelete1720124775948 implements MigrationInterface {
    name = 'AddDelete1720124775948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` DROP FOREIGN KEY \`FK_cd4380f59b8b234a9d3dfc50d95\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`authorId\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`picture\` \`picture\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`adress\` \`adress\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` ADD CONSTRAINT \`FK_cd4380f59b8b234a9d3dfc50d95\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` DROP FOREIGN KEY \`FK_cd4380f59b8b234a9d3dfc50d95\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`adress\` \`adress\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`picture\` \`picture\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`authorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` ADD CONSTRAINT \`FK_cd4380f59b8b234a9d3dfc50d95\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
