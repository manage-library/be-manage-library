"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECTransactionStatus = exports.ESortBy = exports.ESortType = exports.EGender = exports.ECensorshipStatus = exports.EReleaseStatus = exports.vipAmount = exports.EVip = exports.ERole = void 0;
var ERole;
(function (ERole) {
    ERole[ERole["USER"] = 1] = "USER";
    ERole[ERole["ADMIN"] = 2] = "ADMIN";
})(ERole = exports.ERole || (exports.ERole = {}));
var EVip;
(function (EVip) {
    EVip[EVip["VIP_0"] = 0] = "VIP_0";
    EVip[EVip["VIP_1"] = 1] = "VIP_1";
    EVip[EVip["VIP_2"] = 3] = "VIP_2";
    EVip[EVip["VIP_3"] = 6] = "VIP_3";
})(EVip = exports.EVip || (exports.EVip = {}));
exports.vipAmount = {
    1: '99.000',
    3: '199.000',
    6: '399.000',
};
var EReleaseStatus;
(function (EReleaseStatus) {
    EReleaseStatus[EReleaseStatus["RELEASING"] = 1] = "RELEASING";
    EReleaseStatus[EReleaseStatus["RELEASED"] = 2] = "RELEASED";
})(EReleaseStatus = exports.EReleaseStatus || (exports.EReleaseStatus = {}));
var ECensorshipStatus;
(function (ECensorshipStatus) {
    ECensorshipStatus[ECensorshipStatus["PENDING"] = 1] = "PENDING";
    ECensorshipStatus[ECensorshipStatus["APPROVED"] = 2] = "APPROVED";
    ECensorshipStatus[ECensorshipStatus["REJECTED"] = 3] = "REJECTED";
})(ECensorshipStatus = exports.ECensorshipStatus || (exports.ECensorshipStatus = {}));
var EGender;
(function (EGender) {
    EGender[EGender["MALE"] = 1] = "MALE";
    EGender[EGender["FEMALE"] = 2] = "FEMALE";
    EGender[EGender["OTHER"] = 3] = "OTHER";
})(EGender = exports.EGender || (exports.EGender = {}));
var ESortType;
(function (ESortType) {
    ESortType["ASC"] = "ASC";
    ESortType["DESC"] = "DESC";
})(ESortType = exports.ESortType || (exports.ESortType = {}));
var ESortBy;
(function (ESortBy) {
    ESortBy[ESortBy["LIKE"] = 1] = "LIKE";
    ESortBy[ESortBy["VIEW"] = 2] = "VIEW";
    ESortBy[ESortBy["UPDATE_TIME"] = 3] = "UPDATE_TIME";
})(ESortBy = exports.ESortBy || (exports.ESortBy = {}));
var ECTransactionStatus;
(function (ECTransactionStatus) {
    ECTransactionStatus[ECTransactionStatus["PENDING"] = 1] = "PENDING";
    ECTransactionStatus[ECTransactionStatus["APPROVED"] = 2] = "APPROVED";
    ECTransactionStatus[ECTransactionStatus["REJECTED"] = 3] = "REJECTED";
})(ECTransactionStatus = exports.ECTransactionStatus || (exports.ECTransactionStatus = {}));
//# sourceMappingURL=index.js.map