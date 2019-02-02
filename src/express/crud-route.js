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
var CRUDRoute = /** @class */ (function () {
    function CRUDRoute(app, path, entity) {
        var _this = this;
        this.app = app;
        this.entity = entity;
        this.app.get(path + "/", function (req, res, next) { return _this.get(req, res, next); });
        this.app.get(path + "/:id", function (req, res, next) { return _this.getOne(req, res, next); });
        this.app.post(path + "/filter", function (req, res, next) { return _this.filter(req, res, next); });
        this.app.post(path + "/", function (req, res, next) { return _this.add(req, res, next); });
        this.app.put(path + "/", function (req, res, next) { return _this.change(req, res, next); });
        this.app["delete"](path + "/:id", function (req, res, next) { return _this["delete"](req, res, next); });
    }
    CRUDRoute.prototype.get = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var retVal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.find({})];
                    case 1:
                        retVal = _a.sent();
                        res.json(retVal);
                        return [2 /*return*/, null];
                }
            });
        });
    };
    CRUDRoute.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var retVal, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.log.debug("getOne " + req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entity.findOne({ _id: req.params.id })];
                    case 2:
                        retVal = _a.sent();
                        res.json(retVal);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        logger_1.log.error(e_1);
                        res.status(500).json({
                            status: 500,
                            error: e_1
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    CRUDRoute.prototype.filter = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var retVal, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.log.debug('filtering on', req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entity.find(req.body)];
                    case 2:
                        retVal = _a.sent();
                        res.json(retVal);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        logger_1.log.error(e_2);
                        res.status(500).json({
                            status: 500,
                            error: e_2
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    CRUDRoute.prototype.add = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, retVal, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = req.body;
                        return [4 /*yield*/, this.entity.insert(data)];
                    case 1:
                        retVal = _a.sent();
                        res.json(retVal);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        logger_1.log.error(e_3);
                        res.status(500).json({
                            status: 500,
                            error: e_3
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    CRUDRoute.prototype.change = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, retVal, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entity.update(data)];
                    case 2:
                        retVal = _a.sent();
                        res.json(retVal);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        logger_1.log.error(e_4);
                        res.status(500).json({
                            status: 500,
                            error: e_4
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    CRUDRoute.prototype["delete"] = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, retVal, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.entity["delete"](id)];
                    case 1:
                        retVal = _a.sent();
                        res.json(retVal);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        logger_1.log.error(e_5);
                        res.status(500).json({
                            status: 500,
                            error: e_5
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    return CRUDRoute;
}());
exports.CRUDRoute = CRUDRoute;
