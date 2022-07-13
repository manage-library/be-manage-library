import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTransactionsTable1651286946838
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'vip_id',
            type: 'int',
            length: '1',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'status',
            type: 'int',
            length: '1',
          },
          {
            name: 'code',
            type: 'varchar',
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
    queryRunner.dropTable('transactions');
  }
}
