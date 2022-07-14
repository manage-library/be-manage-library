"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooksTable1651284841688 = void 0;
const typeorm_1 = require("typeorm");
class createBooksTable1651284841688 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
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
                    name: 'image',
                    type: 'text',
                    length: '1000',
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
                    name: 'author_description',
                    type: 'longtext',
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
        }));
    }
    async down(queryRunner) {
        queryRunner.query('DROP TABLE books');
    }
}
exports.createBooksTable1651284841688 = createBooksTable1651284841688;
//# sourceMappingURL=1651284841688-create-books-table.js.map