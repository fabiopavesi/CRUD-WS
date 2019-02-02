"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var logger_1 = require("../logger/logger");
var MongoEntity = /** @class */ (function () {
    function MongoEntity(collection, url, dbName) {
        this.collection = collection;
        this.url = 'mongodb://mongo:27017';
        this.dbName = 'test';
        this.MongoClient = require('mongodb').MongoClient;
        this.url = url;
        this.dbName = dbName;
    }
    MongoEntity.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MongoClient.connect(this.url, { useNewUrlParser: true })];
                    case 1:
                        client = _a.sent();
                        this.client = client;
                        return [2 /*return*/, client.db(this.dbName)];
                }
            });
        });
    };
    MongoEntity.prototype.close = function () {
        if (this.client) {
            this.client.close();
        }
    };
    MongoEntity.prototype.find = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var db, results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.collection)
                                .find(criteria)
                                .toArray()];
                    case 2:
                        results = _a.sent();
                        this.close();
                        return [2 /*return*/, results];
                    case 3:
                        err_1 = _a.sent();
                        logger_1.log.error('error', err_1);
                        this.close();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoEntity.prototype.findOne = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var db, results, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.collection)
                                .find(criteria)
                                .toArray()];
                    case 2:
                        results = _a.sent();
                        this.close();
                        if (results.length > 0) {
                            logger_1.log.debug('finding folders for', results[0]);
                            return [2 /*return*/, results[0]];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        logger_1.log.error('error', err_2);
                        this.close();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoEntity.prototype.insert = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, results, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.collection)
                                .insertOne(value)];
                    case 2:
                        results = _a.sent();
                        this.close();
                        return [2 /*return*/, results];
                    case 3:
                        err_3 = _a.sent();
                        logger_1.log.error('error', err_3);
                        this.close();
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoEntity.prototype.update = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, id, results, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        db = _a.sent();
                        id = value._id;
                        delete value._id;
                        return [4 /*yield*/, db.collection(this.collection)
                                .updateOne({ _id: id }, {
                                $set: value
                            })];
                    case 2:
                        results = _a.sent();
                        this.close();
                        return [2 /*return*/, results];
                    case 3:
                        err_4 = _a.sent();
                        logger_1.log.error('error', err_4);
                        this.close();
                        throw err_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoEntity.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, results, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.collection)
                                .removeOne({ _id: id })];
                    case 2:
                        results = _a.sent();
                        this.close();
                        return [2 /*return*/, results];
                    case 3:
                        err_5 = _a.sent();
                        logger_1.log.error('error', err_5);
                        this.close();
                        throw err_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MongoEntity;
}());
exports.MongoEntity = MongoEntity;
