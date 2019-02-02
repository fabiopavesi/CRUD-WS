"use strict";
exports.__esModule = true;
var mongo_entity_1 = require("./mongo-entity");
var MongoEntityFactory = /** @class */ (function () {
    function MongoEntityFactory(url, dbName) {
        this.url = url;
        this.dbName = dbName;
    }
    MongoEntityFactory.prototype.createEntityController = function (collection) {
        return new mongo_entity_1.MongoEntity(collection, this.url, this.dbName);
    };
    MongoEntityFactory.prototype.setOptions = function (options) {
        if (!options) {
            throw new Error('No options passed');
        }
    };
    return MongoEntityFactory;
}());
exports.MongoEntityFactory = MongoEntityFactory;
