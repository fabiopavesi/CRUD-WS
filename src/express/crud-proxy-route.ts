import {Entity} from '../entity/entity';
import {log} from '../logger/logger';
import * as request from 'request'

export class CRUDProxyRoute {
	constructor(private app, private path: string, private baseUrl: string) {

		this.app.get(`${path}/`, (req, res, next) => this.get(req, res, next))
		this.app.get(`${path}/:id`, (req, res, next) => this.getOne(req, res, next))
		this.app.post(`${path}/filter`, (req, res, next) => this.filter(req, res, next))
		this.app.post(`${path}/`, (req, res, next) => this.add(req, res, next))
		this.app.put(`${path}/`, (req, res, next) => this.change(req, res, next))
		this.app.delete(`${path}/:id`, (req, res, next) => this.delete(req, res, next))
	}

	async get(req, res, next) {
		try {
			log.debug('requesting', `${this.baseUrl}`)
			request.get(`${this.baseUrl}`, req.headers).pipe(res).on('error', (error) => {
				log.error(error)
			})
		} catch (e) {
			log.error(e)
			res.status(500).json({
				status: 500,
				error: e
			})

		}
		return null
	}

	async getOne(req, res, next) {
		try {
			log.debug(`getOne ${req.params.id}`)
			request.get(`${this.baseUrl}/${req.params.id}`, req.headers).pipe(res)
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
		try {
			log.debug('filtering on', req.body)
			request.post(`${this.baseUrl}/filter`, req.body, req.headers).pipe(res)
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

		try {
			// $log.info('data', data)
			const data = req.body
			request.post(`${this.baseUrl}`, data, req.headers).pipe(res)
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
			request.put(`${this.baseUrl}`, data, req.headers).pipe(res)
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
			request.post(`${this.baseUrl}/${id}`, req.headers).pipe(res)
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
