const express		= require('express');
const router		= express.Router();
const ticketControll= require('../controllers/ticketController');

router.get('/users/:id/tickets',		ticketControll.getTickets);
router.get('/users/:id/tickets/:ticket',	ticketControll.getTicket);
router.post('/users/:id/tickets',		ticketControll.createTicket);
router.put('/users/:id/tickets/:ticket',	ticketControll.updateTicket);
router.delete('/users/:id/tickets/:ticket',ticketControll.deleteTicket);

module.exports = router;
