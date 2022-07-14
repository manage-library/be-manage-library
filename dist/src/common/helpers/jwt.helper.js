"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const EnvKey_1 = require("./../../constants/EnvKey");
const jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(data, configService) {
    const accessToken = (0, jsonwebtoken_1.sign)(data, configService.get(EnvKey_1.ACCESS_TOKEN_SECRET), {
        algorithm: 'HS256',
        expiresIn: configService.get(EnvKey_1.ACCESS_TOKEN_EXPIRE),
    });
    const refreshToken = (0, jsonwebtoken_1.sign)(data, configService.get(EnvKey_1.REFRESH_TOKEN_SECRET), {
        algorithm: 'HS256',
        expiresIn: configService.get(EnvKey_1.REFRESH_TOKEN_EXPIRE),
    });
    return { accessToken, refreshToken };
}
exports.generateToken = generateToken;
//# sourceMappingURL=jwt.helper.js.map