"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionsTable1651286946838 = void 0;
const typeorm_1 = require("typeorm");
class createTransactionsTable1651286946838 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        queryRunner.dropTable('transactions');
    }
}
exports.createTransactionsTable1651286946838 = createTransactionsTable1651286946838;
//# sourceMappingURL=1651286946838-create-transactions-table.js.map