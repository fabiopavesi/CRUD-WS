"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crud_route_1 = require("./crud-route");
const logger_1 = require("../logger/logger");
const c_r_u_d_proxy_route_1 = require("./c-r-u-d-proxy-route");
const bodyParser = require("body-parser");
const express = require('express');
class ExpressServer {
    constructor(port) {
        this.app = express();
        this.app.use((req, res, next) => {
            logger_1.log.debug(`${req.method} ${req.path}`);
            next();
        });
        this.app.use(bodyParser.json());
        this.app.listen(port, () => {
            logger_1.log.info(`Server listening on port ${port}`);
        });
    }
    addRoute(path, router) {
        this.app.use(path, router);
    }
    addCrudRoute(path, entity) {
        const crudRoute = new crud_route_1.CRUDRoute(this.app, path, entity);
    }
    addCrudProxyRoute(path, baseUrl) {
        const crudRoute = new c_r_u_d_proxy_route_1.CrudProxyRoute(this.app, path, baseUrl);
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=server.js.map