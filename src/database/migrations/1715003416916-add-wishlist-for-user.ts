import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWishlistForUser1715003416916 implements MigrationInterface {
    name = 'AddWishlistForUser1715003416916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_wishlist_book\` (\`userId\` int NOT NULL, \`bookId\` int NOT NULL, INDEX \`IDX_d10ab5018a51af943ff6338012\` (\`userId\`), INDEX \`IDX_cd4380f59b8b234a9d3dfc50d9\` (\`bookId\`), PRIMARY KEY (\`userId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` ADD CONSTRAINT \`FK_d10ab5018a51af943ff6338012b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` ADD CONSTRAINT \`FK_cd4380f59b8b234a9d3dfc50d95\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` DROP FOREIGN KEY \`FK_cd4380f59b8b234a9d3dfc50d95\``);
        await queryRunner.query(`ALTER TABLE \`user_wishlist_book\` DROP FOREIGN KEY \`FK_d10ab5018a51af943ff6338012b\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_cd4380f59b8b234a9d3dfc50d9\` ON \`user_wishlist_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_d10ab5018a51af943ff6338012\` ON \`user_wishlist_book\``);
        await queryRunner.query(`DROP TABLE \`user_wishlist_book\``);
    }

}
