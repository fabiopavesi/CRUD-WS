import {MongoEntityFactory} from '../entity/mongo/MongoEntityFactory';

import express = require('express');
import {ExpressServer} from '../express/server';
import {MongoEntity} from '../entity/mongo/mongo-entity';
import {log} from '../logger/logger';
import {Entity} from '../entity/entity';

log.info('Hello there')

const router = express.Router()
router.get('/', async (req, res) => {
	res.json({
		status: 202,
		message: 'Accepted'
	})
})

const entityFactory = new MongoEntityFactory('mongodb://localhost:27017', 'test')
const entity: Entity = entityFactory.createEntityController('pippo')

if (entity) {
	const server = new ExpressServer(3000)
	server.addRoute('/rest', router)
	server.addCrudRoute('/pippo/files', entity)
	const server2 = new ExpressServer(3001)
	server2.addCrudProxyRoute('/files', 'http://localhost:3000/pippo')

} else {
	log.error('no entity')
}
