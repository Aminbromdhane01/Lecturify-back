import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReviewEntity1716825821325 implements MigrationInterface {
    name = 'AddReviewEntity1716825821325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comments\` varchar(255) NOT NULL, \`rating\` int NOT NULL, \`essayId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_c67cc523c7ba1bb823749b7cafd\` FOREIGN KEY (\`essayId\`) REFERENCES \`essay\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_c67cc523c7ba1bb823749b7cafd\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`review\``);
    }

}
