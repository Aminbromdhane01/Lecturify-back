import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEssayEntity1716817360202 implements MigrationInterface {
    name = 'AddEssayEntity1716817360202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`essay\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`isReviewd\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`essay\` ADD CONSTRAINT \`FK_d916d19bfaed180463f485b1dac\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`essay\` DROP FOREIGN KEY \`FK_d916d19bfaed180463f485b1dac\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`essay\``);
    }

}
