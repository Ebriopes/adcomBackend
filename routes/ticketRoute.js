const express = require('express');
const router = express.Router();
const ticketControll = require('../controllers/ticketController');

router.get('/tickets', ticketControll.getTickets);
router.get('/ticket', ticketControll.getTicket);
router.post('/ticket', ticketControll.createTicket);
router.put('/ticket', ticketControll.updateTicket);
router.delete('/ticket', ticketControll.deleteTicket);

module.exports = router;
