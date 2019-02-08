import {Entity} from '../entity';
import {log} from '../../logger/logger';

export class MongoEntity implements Entity {
	private client
	private url = 'mongodb://mongo:27017';
	private dbName = 'test';

	private MongoClient = require('mongodb').MongoClient;

	constructor(private collection, url: string, dbName: string) {
		this.url = url
		this.dbName = dbName
	}

	private async connect() {
		// Use connect method to connect to the server
		const client = await this.MongoClient.connect(this.url, {useNewUrlParser: true});
		this.client = client;
		return client.db(this.dbName);
	}

	private close() {
		if (this.client) {
			this.client.close()
		}
	}


	async find(criteria: any): Promise<any> {
		try {
			const db: any = await this.connect()
			const results = await db.collection(this.collection)
				.find(criteria)
				.toArray()
			this.close()
			return results;
		} catch (err) {
			log.error('error', err)
			this.close()
			throw err
		}
	}

	async findOne(criteria: any): Promise<any> {
		try {
			const db: any = await this.connect()
			const results = await db.collection(this.collection)
				.find(criteria)
				.toArray()
			this.close()
			if (results.length > 0) {
				log.debug('finding folders for', results[0])
				return results[0];
			}
		} catch (err) {
			log.error('error', err)
			this.close()
			throw err
		}
	}

	async insert(value: any): Promise<any> {
		try {
			const db: any = await this.connect()
			const results = await db.collection(this.collection)
				.insertOne(value)
			this.close()
			return results;
		} catch (err) {
			log.error('error', err)
			this.close()
			throw err
		}
	}

	async update(value: any): Promise<any> {
		try {
			const db: any = await this.connect()
			const id = value._id
			delete value._id
			const results = await db.collection(this.collection)
				.updateOne({_id: id}, {
					$set: value
				})
			this.close()
			return results;
		} catch (err) {
			log.error('error', err)
			this.close()
			throw err
		}
	}

	async deleteOne(id: string): Promise<any> {
		try {
			const db: any = await this.connect()
			const results = await db.collection(this.collection)
				.removeOne({_id: id})
			this.close()
			return results;
		} catch (err) {
			log.error('error', err)
			this.close()
			throw err
		}
	}

	async delete(criteria: any): Promise<any> {
		try {
			const db: any = await this.connect()
			const results = await db.collection(this.collection)
				.remove(criteria, {
					justOne: false
				})
			this.close()
			return results;
		} catch (err) {
			log.error('error', err)
			this.close()
			throw err
		}
	}

}
