const ticketService = require('../services/ticketServices')

module.exports = {
	getTickets: async (req, res) => {
		try {
			const tickets = await ticketService.getTickets();
			res.status(200).send(tickets);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	getTicket: async (req, res) => {
		try {
			const ticket = await ticketService.getTicket(req.params.ticket);
			res.status(200).send(ticket);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	createTicket: async (req, res) => {
		try {
			const ticket = await ticketService.createTicket(req.body);
			res.status(201).send(ticket);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	updateTicket: async (req, res) => {
		try {
			const ticket = await ticketService.getTicket(req.params.ticket);
			const newTicket = await ticketService.updateTicket(ticket, req.body);
			res.status(202).send({
				message: 'User modified',
				newTicket
			});
		} catch (error) {
			res.status(409).send(error);
		}
	},
	deleteTicket: async (req, res) => {
		try {
			const ticket = await ticketService.getTicket(req.params.ticket);
			if(ticket.is_active === true){
				await ticketService.updateTicket(ticket, {is_active: false});
				res.status(200).send({message: "Ticket burn it"});
			}else{
				res.status(404).send({message: "Ticket no found"})
			}
		} catch (error) {
			res.status(409).send(error);
		}
	}
}
