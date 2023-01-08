'use strict'

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
	console.log('Error de conexion a MongoDB', err);
	process.exit(1); 
})

mongoose.connection.once('open', () => {
	console.log('conectado a MongoDB en', mongoose.connection.name);
})


mongoose.connect('mongodb://127.0.0.1/nodepopbd');


module.exports = mongoose.connection;
