# CRUD-Oriented Web Services
This is a work-in-progress.

This is a simple library for quick development of Express web service endpoints.
In particular it makes development of *back line* CRUD API's easy.

*Entity* and *EntityFactory* are defined as interfaces, so as to be able to plug in additional implementations.
For the time being the only implementation is MongoDB.

## Installation

``npm i crud-ws``

## CRUD Routes
Creating the easiest server is as easy as:
```typescript
const entityFactory = new MongoEntityFactory('mongodb://localhost:27017', 'myDb');
const entity: Entity = entityFactory.createEntityController('myCollection');

const server = new ExpressServer(3000);
server.addCrudRoute('/documents', entity);

``` 

This snippet of code will generate for you:
* an Express server on port 3000
* a */documents* route with default methods:
    * GET /documents
    * GET /documents/:id
    * POST /documents/filter
    * POST /documents
    * PUT /documents
    * DELETE /documents/:id
* error handling at all levels

## CRUD Proxy Routes
CRUD-WS also provides a CrudProxyRoute, for an edge service proxying a CRUD endpoint.

```typescript
	const server = new ExpressServer(3001)
	server.addCrudProxyRoute('/documents', 'http://localhost:3000/rest')

```

## Standard routes

You can also add standard Express routes like this:
```typescript
const router = express.Router()
router.get('/test', async (req, res) => {
	res.json({
		status: 202,
		message: 'Accepted'
	})
	
server.addRoute('/rest', router)
})
```

