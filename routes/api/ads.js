const express = require('express');
const Ad = require('../../models/Ad');

const router = express.Router();

// GET /api/ads

router.get('/', async (req, res, next) => {
	try {
		// filters - query string
		const name = req.query.name;
		const age = req.query.age;

		// skip - limit
		const skip = req.query.skip;
		const limit = req.query.limit;

		// field selecion
		const fields = req.query.fields; // api/ads?fields=name-_id

		// ordenacion
		const sort = req.query.sort;// /api/ads?sort=-age%20name

		const filter = {}; // si vacio, devuleve todos los agentes.

		if (name) { // /api/agentes?name=Smith
			filter.name = name;
		}

		if (age) { // /api/agentes?age=35
			filter.age = age;
		}

		const ads = await Ad.lista(filter, skip, limit, fields, sort); 

		res.json({results: ads});


	} catch(err) {
		next(err);
	}
	
})

// GET /api/ads/(id)

router.get('/:id', async (req, res, next) => {
	try {
		// lee el valor de entrada y lo meto en una variable
		const id = req.params.id;

		// buscar un agente en la base de datos
		const ad = await Ad.findById(id);

		res.json({result: ad});

	} catch(err) {
		next(err)
	}
}
)



module.exports = router;