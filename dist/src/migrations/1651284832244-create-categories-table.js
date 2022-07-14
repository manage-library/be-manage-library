"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoriesTable1651284832244 = void 0;
const typeorm_1 = require("typeorm");
class createCategoriesTable1651284832244 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'categories',
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
        queryRunner.query('DROP TABLE categories');
    }
}
exports.createCategoriesTable1651284832244 = createCategoriesTable1651284832244;
//# sourceMappingURL=1651284832244-create-categories-table.js.map