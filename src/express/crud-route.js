"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger/logger");
class CRUDRoute {
    constructor(app, path, entity) {
        this.app = app;
        this.entity = entity;
        this.app.get(`${path}/`, (req, res, next) => this.get(req, res, next));
        this.app.get(`${path}/:id`, (req, res, next) => this.getOne(req, res, next));
        this.app.post(`${path}/filter`, (req, res, next) => this.filter(req, res, next));
        this.app.post(`${path}/`, (req, res, next) => this.add(req, res, next));
        this.app.put(`${path}/`, (req, res, next) => this.change(req, res, next));
        this.app.delete(`${path}/:id`, (req, res, next) => this.delete(req, res, next));
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const retVal = yield this.entity.find({});
            res.json(retVal);
            return null;
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.log.debug(`getOne ${req.params.id}`);
            try {
                const retVal = yield this.entity.findOne({ _id: req.params.id });
                res.json(retVal);
            }
            catch (e) {
                logger_1.log.error(e);
                res.status(500).json({
                    status: 500,
                    error: e
                });
            }
            return null;
        });
    }
    filter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.log.debug('filtering on', req.body);
            try {
                const retVal = yield this.entity.find(req.body);
                res.json(retVal);
            }
            catch (e) {
                logger_1.log.error(e);
                res.status(500).json({
                    status: 500,
                    error: e
                });
            }
            return null;
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const retVal = yield this.entity.insert(data);
                res.json(retVal);
            }
            catch (e) {
                logger_1.log.error(e);
                res.status(500).json({
                    status: 500,
                    error: e
                });
            }
            return null;
        });
    }
    change(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const retVal = yield this.entity.update(data);
                res.json(retVal);
            }
            catch (e) {
                logger_1.log.error(e);
                res.status(500).json({
                    status: 500,
                    error: e
                });
            }
            return null;
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const retVal = yield this.entity.delete(id);
                res.json(retVal);
            }
            catch (e) {
                logger_1.log.error(e);
                res.status(500).json({
                    status: 500,
                    error: e
                });
            }
            return null;
        });
    }
}
exports.CRUDRoute = CRUDRoute;
//# sourceMappingURL=crud-route.js.map