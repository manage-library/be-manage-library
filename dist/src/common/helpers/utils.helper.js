"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNullProperty = exports.randomNumber = exports.randomString = void 0;
function randomString(length = 6) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomString = randomString;
function randomNumber(length = 6) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomNumber = randomNumber;
function removeNullProperty(obj) {
    const newObject = Object.keys(obj)
        .filter((k) => obj[k] != null)
        .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
    return newObject;
}
exports.removeNullProperty = removeNullProperty;
//# sourceMappingURL=utils.helper.js.map