const express = require('express');
const bodyParser = require('body-parser');
// routers
const { appRouter, goodsRouter } = require('./router');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

	next();
});

app.use('/', appRouter);
app.use('/goods', goodsRouter);

app.listen(9001, () => {
	console.log('Application is running at ', 9001);
});
