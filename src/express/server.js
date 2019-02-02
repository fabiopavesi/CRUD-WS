"use strict";
exports.__esModule = true;
var crud_route_1 = require("./crud-route");
var logger_1 = require("../logger/logger");
var proxy_crud_route_1 = require("./proxy-crud-route");
var bodyParser = require("body-parser");
var express = require('express');
var ExpressServer = /** @class */ (function () {
    function ExpressServer(port) {
        this.app = express();
        this.app.use(function (req, res, next) {
            logger_1.log.debug(req.method + " " + req.path);
            next();
        });
        this.app.use(bodyParser.json());
        this.app.listen(port, function () {
            logger_1.log.info("Server listening on port " + port);
        });
    }
    ExpressServer.prototype.addRoute = function (path, router) {
        this.app.use(path, router);
    };
    ExpressServer.prototype.addCrudRoute = function (path, entity) {
        var crudRoute = new crud_route_1.CRUDRoute(this.app, path, entity);
    };
    ExpressServer.prototype.addCrudProxyRoute = function (path, baseUrl) {
        var crudRoute = new proxy_crud_route_1.ProxyCRUDRoute(this.app, path, baseUrl);
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
