"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChapterTable1651284960418 = void 0;
const typeorm_1 = require("typeorm");
class createChapterTable1651284960418 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'chapter',
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
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'content',
                    type: 'longtext',
                },
                {
                    name: 'book_id',
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
        }));
    }
    async down(queryRunner) {
        queryRunner.dropTable('chapter');
    }
}
exports.createChapterTable1651284960418 = createChapterTable1651284960418;
//# sourceMappingURL=1651284960418-create-chapter-table.js.map