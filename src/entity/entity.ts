export interface Entity {
	insert(value: any): Promise<any>
	insertMany(values: any[]): Promise<any>
	find(criteria: any): Promise<any>
	findOne(criteria: any): Promise<any>
	update(value: any): Promise<any>
	deleteOne(id: string): Promise<any>
	delete(criteria: any): Promise<any>
}

