"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchPassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const saltOrRounds = 10;
const hashPassword = async (password) => await bcrypt.hash(password, saltOrRounds);
exports.hashPassword = hashPassword;
const isMatchPassword = async ({ password, hash, }) => await bcrypt.compare(password, hash);
exports.isMatchPassword = isMatchPassword;
//# sourceMappingURL=bcrypt.helper.js.map