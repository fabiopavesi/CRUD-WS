"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_entity_1 = require("./mongo-entity");
class MongoEntityFactory {
    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName;
    }
    createEntityController(collection) {
        return new mongo_entity_1.MongoEntity(collection, this.url, this.dbName);
    }
    setOptions(options) {
        if (!options) {
            throw new Error('No options passed');
        }
    }
}
exports.MongoEntityFactory = MongoEntityFactory;
//# sourceMappingURL=MongoEntityFactory.js.map