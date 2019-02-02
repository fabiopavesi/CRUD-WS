import {Router} from 'express';
import {Entity} from '../entity/entity';
import {CRUDRoute} from './crud-route';
import {log} from '../logger/logger';
import {ProxyCRUDRoute} from './proxy-crud-route';
import bodyParser = require('body-parser');


const express = require('express')

export class ExpressServer {
	private app = express()

	constructor(port: number) {
		this.app.use((req, res, next) => {
			log.debug(`${req.method} ${req.path}`)
			next()
		})
		this.app.use(bodyParser.json())
		this.app.listen(port, () => {
			log.info(`Server listening on port ${port}`)
		})
	}

	addRoute(path: string, router: Router) {
		this.app.use(path, router)
	}

	addCrudRoute(path: string, entity: Entity) {
		const crudRoute = new CRUDRoute(this.app, path, entity)
	}

	addCrudProxyRoute(path: string, baseUrl: string) {
		const crudRoute = new ProxyCRUDRoute(this.app, path, baseUrl)
	}

}
