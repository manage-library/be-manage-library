"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookCategoryTable1651284852446 = void 0;
const typeorm_1 = require("typeorm");
class createBookCategoryTable1651284852446 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'book_category',
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
                    name: 'category_id',
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
        queryRunner.query('DROP TABLE book_category');
    }
}
exports.createBookCategoryTable1651284852446 = createBookCategoryTable1651284852446;
//# sourceMappingURL=1651284852446-create-book-category-table.js.map