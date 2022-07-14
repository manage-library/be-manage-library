"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentsTable1651284864350 = void 0;
const typeorm_1 = require("typeorm");
class createCommentsTable1651284864350 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'comments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'content',
                    type: 'varchar',
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
        queryRunner.dropTable('comments');
    }
}
exports.createCommentsTable1651284864350 = createCommentsTable1651284864350;
//# sourceMappingURL=1651284864350-create-comments-table.js.map