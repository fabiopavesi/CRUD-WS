export interface Entity {
	insert(value: any): Promise<any>
	find(criteria: any): Promise<any>
	findOne(criteria: any): Promise<any>
	update(value: any): Promise<any>
	delete(id: string): Promise<any>
}

