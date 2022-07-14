"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDownloadsTable1651284969565 = void 0;
const typeorm_1 = require("typeorm");
class createDownloadsTable1651284969565 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'downloads',
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
        queryRunner.dropTable('downloads');
    }
}
exports.createDownloadsTable1651284969565 = createDownloadsTable1651284969565;
//# sourceMappingURL=1651284969565-create-downloads-table.js.map