"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavoritesTable1651284993084 = void 0;
const typeorm_1 = require("typeorm");
class createFavoritesTable1651284993084 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'favorites',
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
        queryRunner.dropTable('favorites');
    }
}
exports.createFavoritesTable1651284993084 = createFavoritesTable1651284993084;
//# sourceMappingURL=1651284993084-create-favorites-table.js.map