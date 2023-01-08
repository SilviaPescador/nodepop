/**
 * Initialize Nodepop with a minimum database.
 */

const readline = require('readline')


// cargamos los modelos que vamos a usar
const Ad = require('./models/Ad')


async function main() {
	
	const goAhead = await questionYesNo('WARNING: Are you sure you want to DELETE all database ????? [n]')
	if (!goAhead) {
		process.exit();
	}

	const connection = require('./lib/connectMongoose')
	
	await initAds();

	connection.close();

}

main().catch(err => ('An error occurred', err))



async function initAds() {
	
	const result = await Ad.deleteMany();
	console.log(`Deleted ${result.deletedCount} ads.`);

	
	const inserted = await Ad.insertMany([
		{"name": "Bike", "stock": true, "price": 230.15, "photo": "bike.jpg", "tags": ["lifestyle", "motor"]},
		{"name": "IPhone 10", "stock": false, "price": 890.00, "photo": "iphone.jpg", "tags": ["lifestyle", "tech"]},

	]);
	console.log(`Starting with ${inserted.length} ads.`)
}

async function questionYesNo(text) {
	return new Promise((resolve, reject) => {
		const interface = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		
		interface.question(text, response => {
			interface.close();
			if (response.toLowerCase() === 'yes') {
				resolve(true);
				return;
			}
			resolve(false)
		})
	})
}

