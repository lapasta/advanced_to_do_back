import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserPublicFile1659538812251 implements MigrationInterface {
  name = 'createUserPublicFile1659538812251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(255) NOT NULL COMMENT '이메일',
                \`password\` varchar(255) NULL COMMENT '비밀번호',
                \`provider\` varchar(255) NOT NULL COMMENT '제공업체' DEFAULT 'email',
                \`social_id\` varchar(255) NOT NULL COMMENT '소셜 아이디' DEFAULT '',
                \`name\` varchar(255) NULL COMMENT '이름',
                \`status\` varchar(255) NOT NULL COMMENT '회원상태' DEFAULT 'active',
                \`photo_id\` int NULL,
                INDEX \`IDX_783ffd81ccc0fc1e23b9b45d9d\` (\`provider\`),
                INDEX \`IDX_0cd76a8cdee62eeff31d384b73\` (\`social_id\`),
                INDEX \`IDX_3d44ccf43b8a0d6b9978affb88\` (\`status\`),
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                UNIQUE INDEX \`REL_2863d588f4efce8bf42c9c6352\` (\`photo_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`public_file\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`original_name\` varchar(255) NOT NULL COMMENT '파일 원본명',
                \`save_name\` varchar(255) NOT NULL COMMENT '저장 파일 명',
                \`encoding\` varchar(255) NOT NULL COMMENT '파일 인코딩',
                \`mime_type\` varchar(255) NOT NULL COMMENT '마임타입',
                \`size\` int NOT NULL COMMENT '파일 사이즈',
                \`path\` text NOT NULL COMMENT '파일 경로 / 파일 URL',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD CONSTRAINT \`FK_2863d588f4efce8bf42c9c63526\` FOREIGN KEY (\`photo_id\`) REFERENCES \`public_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_2863d588f4efce8bf42c9c63526\`
        `);
    await queryRunner.query(`
            DROP TABLE \`public_file\`
        `);
    await queryRunner.query(`
            DROP INDEX \`REL_2863d588f4efce8bf42c9c6352\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_3d44ccf43b8a0d6b9978affb88\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_0cd76a8cdee62eeff31d384b73\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_783ffd81ccc0fc1e23b9b45d9d\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
  }
}
