import {EntityFactory} from './entity-factory';
import {MongoEntity} from './mongo-entity';

export class MongoEntityFactory implements EntityFactory {

	constructor(private url: string, private dbName: string) {

	}

	createEntityController(collection: string) {
		return new MongoEntity(collection, this.url, this.dbName)
	}

	setOptions(options: any): void {
		if (!options) {
			throw new Error('No options passed')
		}

	}

}
