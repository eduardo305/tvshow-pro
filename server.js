const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	// /cast/:personId
	server.get('/cast/:personId', (req, res) => {
		const { personId } = req.params;
		return app.render(req, res, '/cast', { personId });
	});

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) {
			throw err;
		}
		console.log('Our server is ready!!!');
	});
});
