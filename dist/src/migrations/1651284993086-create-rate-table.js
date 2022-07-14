"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRatesTable1651284993085 = void 0;
const typeorm_1 = require("typeorm");
class createRatesTable1651284993085 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'rates',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'book_id',
                    type: 'int',
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'rate',
                    type: 'int',
                },
                {
                    name: 'content',
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
        queryRunner.dropTable('rates');
    }
}
exports.createRatesTable1651284993085 = createRatesTable1651284993085;
//# sourceMappingURL=1651284993086-create-rate-table.js.map