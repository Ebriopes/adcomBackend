const ticketService = require('../services/ticketServices');
const buildService = require('../services/buildServices');

module.exports = {
	getTickets: async (req, res) => {
		try {
			const tickets = await ticketService.getTickets(
				req.decoded._id,
				req.query.build_id
			);
			res.status(200).send(tickets);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	getTicket: async (req, res) => {
		try {
			const ticket = await ticketService.getTicket(req.body.ticket_id);
			res.status(200).send(ticket);
		} catch (error) {
			res.status(404).send(error);
		}
	},
	createTicket: async (req, res) => {
		try {
			const build = await buildService.getBuild(req.query.build_id);
			const ticket = await ticketService.createTicket({
				...req.body,
				manager: req.decoded._id,
				build: build._id,
			});

			build.tickets.push(ticket._id);

			await build.save();

			res.status(201).send(ticket);
		} catch (error) {
			console.log(error);
			res.status(404).send(error);
		}
	},
	updateTicket: async (req, res) => {
		try {
			const ticket = await ticketService.getTicket(req.query.ticket_id);
			if (ticket.manager === req.decoded._id || req.decoded.is_admin) {
				const newTicket = await ticketService.updateTicket(
					ticket,
					req.body
				);
				res.status(202).send({
					message: 'Ticket modified',
					newTicket,
				});
			}

			res.status(409).send({
				message: 'You are not the propetary of this ticket',
			});
		} catch (error) {
			res.status(409).send(error);
		}
	},
	deleteTicket: async (req, res) => {
		try {
			const ticket = await ticketService.getTicket(req.body.ticket_id);

			if (
				(ticket.manager === req.decoded._id || req.decoded.is_admin) &&
				ticket.is_active === true
			) {
				await ticketService.updateTicket(ticket, {
					is_active: false,
				});
				res.status(200).send({ message: 'Ticket burn it' });
			}

			res.status(404).send({ message: 'Ticket no found' });
		} catch (error) {
			console.log(error);
			res.status(409).send(error);
		}
	},
};
