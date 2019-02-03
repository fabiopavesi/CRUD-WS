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
const logger_1 = require("../../logger/logger");
class MongoEntity {
    constructor(collection, url, dbName) {
        this.collection = collection;
        this.url = 'mongodb://mongo:27017';
        this.dbName = 'test';
        this.MongoClient = require('mongodb').MongoClient;
        this.url = url;
        this.dbName = dbName;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.MongoClient.connect(this.url, { useNewUrlParser: true });
            this.client = client;
            return client.db(this.dbName);
        });
    }
    close() {
        if (this.client) {
            this.client.close();
        }
    }
    find(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connect();
                const results = yield db.collection(this.collection)
                    .find(criteria)
                    .toArray();
                this.close();
                return results;
            }
            catch (err) {
                logger_1.log.error('error', err);
                this.close();
                throw err;
            }
        });
    }
    findOne(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connect();
                const results = yield db.collection(this.collection)
                    .find(criteria)
                    .toArray();
                this.close();
                if (results.length > 0) {
                    logger_1.log.debug('finding folders for', results[0]);
                    return results[0];
                }
            }
            catch (err) {
                logger_1.log.error('error', err);
                this.close();
                throw err;
            }
        });
    }
    insert(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connect();
                const results = yield db.collection(this.collection)
                    .insertOne(value);
                this.close();
                return results;
            }
            catch (err) {
                logger_1.log.error('error', err);
                this.close();
                throw err;
            }
        });
    }
    update(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connect();
                const id = value._id;
                delete value._id;
                const results = yield db.collection(this.collection)
                    .updateOne({ _id: id }, {
                    $set: value
                });
                this.close();
                return results;
            }
            catch (err) {
                logger_1.log.error('error', err);
                this.close();
                throw err;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connect();
                const results = yield db.collection(this.collection)
                    .removeOne({ _id: id });
                this.close();
                return results;
            }
            catch (err) {
                logger_1.log.error('error', err);
                this.close();
                throw err;
            }
        });
    }
}
exports.MongoEntity = MongoEntity;
//# sourceMappingURL=mongo-entity.js.map