const express = require('express');
const Ad = require('../../models/Ad');

const router = express.Router();

// GET /api/ads

router.get('/', async (req, res, next) => {
	try {
		// filters - query string
		const filter = {};
		const name = req.query.name;
		const stock = req.query.stock;
		const price = req.query.price;
		const tags = req.query.tags;

		// skip - limit
		const skip = req.query.skip;
		const limit = req.query.limit;

		// field selecion
		const fields = req.query.fields; // api/ads?fields=name-_id

		// sort list
		const sort = req.query.sort;// /api/ads?sort=-age%20name

	
		filter.name = name === true? name : {};
		filter.stock = stock === true? stock : {};
		filter.price = price === true ? price : {};
		filter.tags = tags === true ? tags : {};


		const ads = await Ad.list(filter, skip, limit, fields, sort); 

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