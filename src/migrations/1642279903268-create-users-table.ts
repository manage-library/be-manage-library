import { ERole, EVip } from './../common/enums/index';
import { hashPassword } from './../common/helpers/bcrypt.helper';
import { UserEntity } from '@src/modules/user/user.entity';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1642276887991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role_id',
            type: 'int',
            length: '1',
          },
          {
            name: 'vip_id',
            type: 'int',
            length: '1',
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

    const hash = await hashPassword('123456');

    await queryRunner.manager.save(
      queryRunner.manager.create<UserEntity>(UserEntity, {
        email: 'admin@gmail.com',
        password: hash,
        full_name: 'admin',
        role_id: ERole.ADMIN,
        vip_id: EVip.TYPE_6,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE users`);
  }
}
