import {Router} from 'express';
import {Entity} from '../entity/entity';
import {CRUDRoute} from './crud-route';
import {log} from '../logger/logger';
import bodyParser = require('body-parser');
import {CRUDProxyRoute} from './crud-proxy-route';


const express = require('express')

export class ExpressServer {
	private app = express()

	constructor(private port: number) {
		this.app.use((req, res, next) => {
			log.debug(`${req.method} ${req.path}`)
			next()
		})
		this.app.use(bodyParser.json())
	}

	addMiddleware(middleware: (req, res, next?) => void) {
		this.app.use(middleware)
	}

	listen() {
		this.app.listen(this.port, () => {
			log.info(`Server listening on port ${this.port}`)
		})
	}

	addRoute(path: string, router: Router) {
		this.app.use(path, router)
	}

	addCrudRoute(path: string, entity: Entity) {
		const crudRoute = new CRUDRoute(this.app, path, entity)
	}

	addCrudProxyRoute(path: string, baseUrl: string) {
		const crudRoute = new CRUDProxyRoute(this.app, path, baseUrl)
	}

}
