# Nodepop

Deploy:

```sh
npm install
```

Load initial data to database:

```
npm run init-db
```

Start the application in production with:

```sh
npm start
```

Start the application in development with:

```sh
npm run dev
```

## API Documentation

Ad list:

GET /api/ads

{
	"results": [
		{
			"_id": "63bb31d1c7320566205dc106",
			"name": "Bike",
			"stock": true,
			"price": 230.15,
			"photo": "bike.jpg",
			"tags": [
				"lifestyle",
				"motor"
			],
			"__v": 0
		},
		{
			"_id": "63bb31d1c7320566205dc107",
			"name": "IPhone 10",
			"stock": false,
			"price": 890,
			"photo": "iphone.jpg",
			"tags": [
				"lifestyle",
				"tech"
			],
			"__v": 0
		}
	]
}
