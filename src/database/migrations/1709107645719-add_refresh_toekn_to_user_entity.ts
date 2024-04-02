import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToeknToUserEntity1709107645719
  implements MigrationInterface
{
  name = 'AddRefreshToeknToUserEntity1709107645719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``,
    );
  }
}
