const express	= require('express');
const ticket	= require('./ticketRoute')
const user		= require('./userRoute');
const router	= express.Router();

router.use(user);
router.use(ticket);
router.get('/', (x,res)=> res.status(200).send({message: "URI base fine"}));


module.exports	= router;