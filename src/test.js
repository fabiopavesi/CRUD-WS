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
const MongoEntityFactory_1 = require("./entity/MongoEntityFactory");
const express = require("express");
const server_1 = require("./express/server");
const logger_1 = require("./logger/logger");
logger_1.log.info('Hello there');
const router = express.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json({
        status: 202,
        message: 'Accepted'
    });
}));
const entityFactory = new MongoEntityFactory_1.MongoEntityFactory('mongodb://localhost:27017', 'test');
const entity = entityFactory.createEntityController('pippo');
if (entity) {
    const server = new server_1.ExpressServer(3000);
    server.addRoute('/rest', router);
    server.addCrudRoute('/pippo', entity);
    server.addCrudProxyRoute('/files', 'https://sitechar.adamassoft.it/rest');
}
else {
    logger_1.log.error('no entity');
}
//# sourceMappingURL=test.js.map