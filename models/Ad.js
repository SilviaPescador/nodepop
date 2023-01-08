'use strict'

const mongoose = require('mongoose')

const adSchema = mongoose.Schema({
	
	name:  {type: String, unique: true},
	stock: {type: Boolean, index: true}, 
	price: {type: Number, index: true},
	photo: String,
	tags:  {type: Array, index:true},

});  


adSchema.statics.lista = function(filter, skip, limit, fields, sort)  {
	const query = Ad.find(filter); 
	query.skip(skip);
	query.limit(limit);
	query.select(fields);
	query.sort(sort);
	

	return query.exec() 
}

const Ad = mongoose.model('Ad', adSchema);


module.exports = Ad;