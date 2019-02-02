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
var request = require("request");
var ProxyCRUDRoute = /** @class */ (function () {
    function ProxyCRUDRoute(app, path, baseUrl) {
        var _this = this;
        this.app = app;
        this.path = path;
        this.baseUrl = baseUrl;
        this.app.get(path + "/", function (req, res, next) { return _this.get(req, res, next); });
        this.app.get(path + "/:id", function (req, res, next) { return _this.getOne(req, res, next); });
        this.app.post(path + "/filter", function (req, res, next) { return _this.filter(req, res, next); });
        this.app.post(path + "/", function (req, res, next) { return _this.add(req, res, next); });
        this.app.put(path + "/", function (req, res, next) { return _this.change(req, res, next); });
        this.app["delete"](path + "/:id", function (req, res, next) { return _this["delete"](req, res, next); });
    }
    ProxyCRUDRoute.prototype.get = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    logger_1.log.debug('requesting', this.baseUrl + "/" + this.path);
                    request.get("" + this.baseUrl + this.path, req.headers).pipe(res).on('error', function (error) {
                        logger_1.log.error(error);
                    });
                }
                catch (e) {
                    logger_1.log.error(e);
                    res.status(500).json({
                        status: 500,
                        error: e
                    });
                }
                return [2 /*return*/, null];
            });
        });
    };
    ProxyCRUDRoute.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    logger_1.log.debug("getOne " + req.params.id);
                    request.get("" + this.baseUrl + this.path + "/" + req.params.id, req.headers).pipe(res);
                }
                catch (e) {
                    logger_1.log.error(e);
                    res.status(500).json({
                        status: 500,
                        error: e
                    });
                }
                return [2 /*return*/, null];
            });
        });
    };
    ProxyCRUDRoute.prototype.filter = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    logger_1.log.debug('filtering on', req.body);
                    request.post("" + this.baseUrl + this.path + "/filter", req.body, req.headers).pipe(res);
                }
                catch (e) {
                    logger_1.log.error(e);
                    res.status(500).json({
                        status: 500,
                        error: e
                    });
                }
                return [2 /*return*/, null];
            });
        });
    };
    ProxyCRUDRoute.prototype.add = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                try {
                    data = req.body;
                    request.post("" + this.baseUrl + this.path, data, req.headers).pipe(res);
                }
                catch (e) {
                    logger_1.log.error(e);
                    res.status(500).json({
                        status: 500,
                        error: e
                    });
                }
                return [2 /*return*/, null];
            });
        });
    };
    ProxyCRUDRoute.prototype.change = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = req.body;
                try {
                    // $log.info('data', data)
                    request.put("" + this.baseUrl + this.path, data, req.headers).pipe(res);
                }
                catch (e) {
                    logger_1.log.error(e);
                    res.status(500).json({
                        status: 500,
                        error: e
                    });
                }
                return [2 /*return*/, null];
            });
        });
    };
    ProxyCRUDRoute.prototype["delete"] = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                try {
                    id = req.params.id;
                    request.post("" + this.baseUrl + this.path + "/" + id, req.headers).pipe(res);
                }
                catch (e) {
                    logger_1.log.error(e);
                    res.status(500).json({
                        status: 500,
                        error: e
                    });
                }
                return [2 /*return*/, null];
            });
        });
    };
    return ProxyCRUDRoute;
}());
exports.ProxyCRUDRoute = ProxyCRUDRoute;
