import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeUserEntity1708962606134
  implements MigrationInterface
{
  name = 'InitializeUserEntity1708962606134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`gender\` tinyint NOT NULL, \`phonenumber\` varchar(255) NOT NULL, \`adress\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
