const express	= require('express');
const app 		= express();
const PORT		= process.env.PORT;
const router	= require('../routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', router);

app.get('/', (x,res)=> res.status(200).send({message: "All fine"}));

module.exports = {app,PORT};