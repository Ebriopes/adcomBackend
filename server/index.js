const fileupload= require('express-fileupload')
const express	= require('express');
const router	= require('../routes');
const cors		= requires('cors');
const PORT		= process.env.PORT;
const app 		= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({
	useTempFiles: true,
	tempPath: '/tmp/'
}))
//app.use(cors());
app.use('/api/v1', router);

app.get('/', (x,res)=> res.status(200).send({message: "All fine"}));

module.exports = {app,PORT};