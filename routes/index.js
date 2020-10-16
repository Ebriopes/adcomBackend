const express	= require('express');
const ticket	= require( './ticketRoute' );
const build		= require( './buildRoute' );
const user		= require('./userRoute');
const router	= express.Router();

router.get('/', (_,res)=> res.status(200).send({message: "URI base fine"}));
router.use( user );
router.use( build );
router.use( ticket );

module.exports	= router;
