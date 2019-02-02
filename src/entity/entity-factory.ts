export interface EntityFactoryOptions {
	url?: string,
	dbName?: string,
	basePath?: string
}

export interface EntityFactory {
	setOptions(options: any): void

	createEntityController(collection: string)
}
