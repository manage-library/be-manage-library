"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTable1642276887991 = void 0;
const index_1 = require("./../common/enums/index");
const bcrypt_helper_1 = require("./../common/helpers/bcrypt.helper");
const user_entity_1 = require("../modules/user/user.entity");
const typeorm_1 = require("typeorm");
const dayjs = require("dayjs");
class createUserTable1642276887991 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                    isNullable: true,
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
                    name: 'date_of_birth',
                    type: 'datetime',
                    isNullable: true,
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'gender',
                    type: 'int',
                    length: '1',
                    isNullable: true,
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
                    name: 'expired_vip_at',
                    type: 'datetime',
                },
                {
                    name: 'code',
                    type: 'varchar',
                },
                {
                    name: 'code_expired_at',
                    type: 'datetime',
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
        }));
        const hash = await (0, bcrypt_helper_1.hashPassword)('123456');
        await queryRunner.manager.save(queryRunner.manager.create(user_entity_1.UserEntity, {
            email: 'admin@gmail.com',
            password: hash,
            full_name: 'admin',
            role_id: index_1.ERole.ADMIN,
            vip_id: index_1.EVip.VIP_3,
            expired_vip_at: dayjs().add(6, 'M').format('YYYY-MM-DD'),
        }));
    }
    async down(queryRunner) {
        queryRunner.query(`DROP TABLE users`);
    }
}
exports.createUserTable1642276887991 = createUserTable1642276887991;
//# sourceMappingURL=1642279903268-create-users-table.js.map