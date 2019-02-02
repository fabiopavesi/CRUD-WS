import {MongoEntityFactory} from './entity/MongoEntityFactory';

import express = require('express');
import {ExpressServer} from './express/server';
import {MongoEntity} from './entity/mongo-entity';
import {log} from './logger/logger';

log.info('Hello there')

const router = express.Router()
router.get('/', async (req, res) => {
	res.json({
		status: 202,
		message: 'Accepted'
	})
})

const entityFactory = new MongoEntityFactory('mongodb://localhost:27017', 'test')
const entity: MongoEntity = entityFactory.createEntityController('pippo')

if (entity) {
	const server = new ExpressServer(3000)
	server.addRoute('/rest', router)
	server.addCrudRoute('/pippo', entity)
	server.addCrudProxyRoute('/files', 'https://sitechar.adamassoft.it/rest')

} else {
	log.error('no entity')
}
