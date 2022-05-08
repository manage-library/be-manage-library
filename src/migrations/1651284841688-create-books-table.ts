import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBooksTable1651284841688 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'is_vip',
            type: 'boolean',
          },
          {
            name: 'is_visible',
            type: 'boolean',
          },
          {
            name: 'release_status',
            type: 'int',
          },
          {
            name: 'censorship_status',
            type: 'int',
          },
          {
            name: 'author_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE books');
  }
}
