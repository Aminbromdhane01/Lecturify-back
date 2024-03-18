import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPasswordTokenColumnToUserEntity1710319685105
  implements MigrationInterface
{
  name = 'AddResetPasswordTokenColumnToUserEntity1710319685105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reset_password\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`toekn\` varchar(255) NOT NULL,
       UNIQUE INDEX \`IDX_77d7b5436fa7267ddf96146704\` (\`toekn\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`resetPasswordToken\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`resetPasswordToken\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_77d7b5436fa7267ddf96146704\` ON \`reset_password\``,
    );
    await queryRunner.query(`DROP TABLE \`reset_password\``);
  }
}
