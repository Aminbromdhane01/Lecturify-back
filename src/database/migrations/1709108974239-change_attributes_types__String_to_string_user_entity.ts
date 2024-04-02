import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAttributesTypes_StringToStringUserEntity1709108974239
  implements MigrationInterface
{
  name = 'ChangeAttributesTypes_StringToStringUserEntity1709108974239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`,
    );
  }
}
