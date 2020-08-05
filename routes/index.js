const express	= require('express');
const ticket	= require('./ticketRoute')
const user		= require('./userRoute');
const router	= express.Router();

router.get('/', (x,res)=> res.status(200).send({message: "URI base fine"}));
router.use(user);
router.use(ticket);


module.exports	= router;