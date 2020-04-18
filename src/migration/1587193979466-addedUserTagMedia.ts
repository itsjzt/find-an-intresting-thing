import {MigrationInterface, QueryRunner} from "typeorm";

export class addedUserTagMedia1587193979466 implements MigrationInterface {
    name = 'addedUserTagMedia1587193979466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "bio" text NOT NULL, "mediaId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "media" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "rating" integer NOT NULL, "releaseDate" datetime NOT NULL, "ageRestriction" integer NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "media_tags_tag" ("mediaId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("mediaId", "tagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ab7b38610dc84b6e1e7126c5f1" ON "media_tags_tag" ("mediaId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c2b44424bbf1f2d1a7a0daeb27" ON "media_tags_tag" ("tagId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "bio" text NOT NULL, "mediaId" integer, CONSTRAINT "FK_cd81db2b14bf99eaec0934d1f29" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "email", "password", "bio", "mediaId") SELECT "id", "firstName", "lastName", "email", "password", "bio", "mediaId" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ab7b38610dc84b6e1e7126c5f1"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c2b44424bbf1f2d1a7a0daeb27"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_media_tags_tag" ("mediaId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_ab7b38610dc84b6e1e7126c5f18" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_c2b44424bbf1f2d1a7a0daeb279" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("mediaId", "tagId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_media_tags_tag"("mediaId", "tagId") SELECT "mediaId", "tagId" FROM "media_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "media_tags_tag"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_media_tags_tag" RENAME TO "media_tags_tag"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ab7b38610dc84b6e1e7126c5f1" ON "media_tags_tag" ("mediaId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c2b44424bbf1f2d1a7a0daeb27" ON "media_tags_tag" ("tagId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c2b44424bbf1f2d1a7a0daeb27"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ab7b38610dc84b6e1e7126c5f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "media_tags_tag" RENAME TO "temporary_media_tags_tag"`, undefined);
        await queryRunner.query(`CREATE TABLE "media_tags_tag" ("mediaId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("mediaId", "tagId"))`, undefined);
        await queryRunner.query(`INSERT INTO "media_tags_tag"("mediaId", "tagId") SELECT "mediaId", "tagId" FROM "temporary_media_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_media_tags_tag"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c2b44424bbf1f2d1a7a0daeb27" ON "media_tags_tag" ("tagId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ab7b38610dc84b6e1e7126c5f1" ON "media_tags_tag" ("mediaId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "bio" text NOT NULL, "mediaId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "email", "password", "bio", "mediaId") SELECT "id", "firstName", "lastName", "email", "password", "bio", "mediaId" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c2b44424bbf1f2d1a7a0daeb27"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ab7b38610dc84b6e1e7126c5f1"`, undefined);
        await queryRunner.query(`DROP TABLE "media_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "media"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
