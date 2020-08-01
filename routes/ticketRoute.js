const express		= require('express');
const router		= express.Router();
const ticketControll= require('../controllers/ticketController');

router.get('/tickets',		ticketControll.getTickets);
router.get('/tickets/:id',	ticketControll.getTicket);
router.post('/tickets',		ticketControll.createTicket);
router.put('/tickets/:id',	ticketControll.updateTicket);
router.delete('/tickets/:id',ticketControll.deleteTicket);

module.exports = router;