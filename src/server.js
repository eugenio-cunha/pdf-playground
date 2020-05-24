const app = require('./app');

app.listen(process.env.HTTP_PORT, () => {
	console.log('listening on http://localhost:%d', process.env.HTTP_PORT);
});
