"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBoolean = void 0;
const class_transformer_1 = require("class-transformer");
function ToBoolean() {
    return (0, class_transformer_1.Transform)(({ obj, key }) => {
        return (obj[key] === 'true' ||
            obj[key] === true ||
            obj[key] === 1 ||
            obj[key] === '1');
    });
}
exports.ToBoolean = ToBoolean;
//# sourceMappingURL=index.js.map