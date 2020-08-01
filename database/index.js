const mongoose = require('mongoose');
const URI = process.env.DB_URI;

mongoose.connect(URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => err ? console.error(err.reason) : console.info('Database connected'));