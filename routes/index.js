const express	= require('express');
const router	= express.Router();
const ticket	= require('./ticketRoute')

router.use(ticket);
router.get('/', (x,res)=> res.status(200).send({message: "URI base fine"}));


module.exports	= router;