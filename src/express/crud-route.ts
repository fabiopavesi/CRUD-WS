import {EntityFactory} from '../entity/entity-factory';
import {Entity} from '../entity/entity';
import * as express from 'express'
import {log} from '../logger/logger';

export class CRUDRoute {

	constructor(private app, path: string, private entity: Entity) {

		this.app.get(`${path}/`, (req, res, next) => this.get(req, res, next))
		this.app.get(`${path}/:id`, (req, res, next) => this.getOne(req, res, next))
		this.app.post(`${path}/filter`, (req, res, next) => this.filter(req, res, next))
		this.app.post(`${path}/`, (req, res, next) => this.add(req, res, next))
		this.app.put(`${path}/`, (req, res, next) => this.change(req, res, next))
		this.app.delete(`${path}/:id`, (req, res, next) => this.delete(req, res, next))
	}

	async get(req, res, next) {
		const retVal = await this.entity.find({})
		res.json(retVal)
		return null
	}

	async getOne(req, res, next) {
		log.debug(`getOne ${req.params.id}`)
		try {
			const retVal = await this.entity.findOne({_id: req.params.id})
			res.json(retVal)
		} catch (e) {
			log.error(e)
			res.status(500).json({
				status: 500,
				error: e
			})
		}
		return null
	}

	async filter(req, res, next) {
		log.debug('filtering on', req.body)
		try {
			const retVal = await this.entity.find(req.body)
			res.json(retVal)
		} catch (e) {
			log.error(e)
			res.status(500).json({
				status: 500,
				error: e
			})
		}
		return null
	}

	async add(req, res, next) {
		// $log.info('data', data)
		try {
			const data = req.body
			const retVal = await this.entity.insert(data)
			res.json(retVal)
		} catch (e) {
			log.error(e)
			res.status(500).json({
				status: 500,
				error: e
			})
		}
		return null
	}

	async change(req, res, next) {
		const data = req.body

		try {
			// $log.info('data', data)
			const retVal = await this.entity.update(data)
			res.json(retVal)
		} catch (e) {
			log.error(e)
			res.status(500).json({
				status: 500,
				error: e
			})
		}
		return null
	}

	async delete(req, res, next) {
		try {
			// $log.info('data', data)
			const id = req.params.id
			const retVal = await this.entity.delete(id)
			res.json(retVal)
		} catch (e) {
			log.error(e)
			res.status(500).json({
				status: 500,
				error: e
			})
		}
		return null
	}
}
