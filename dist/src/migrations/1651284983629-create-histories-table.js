"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistoriesTable1651284983629 = void 0;
const typeorm_1 = require("typeorm");
class createHistoriesTable1651284983629 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'histories',
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
                    name: 'chapter_id',
                    type: 'int',
                    isNullable: true,
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
        queryRunner.dropTable('histories');
    }
}
exports.createHistoriesTable1651284983629 = createHistoriesTable1651284983629;
//# sourceMappingURL=1651284983629-create-histories-table.js.map