import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotificationEntity1715959895759 implements MigrationInterface {
    name = 'AddNotificationEntity1715959895759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`isRead\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
