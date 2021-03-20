const Ticket = require('../models/Ticket');

module.exports = {
	getTickets: (user_id, build_id) =>
		Ticket.find({ is_active: true, manager: user_id, build: build_id }),
	getTicket: (id) => Ticket.findById(id),
	createTicket: (body) => {
		const ticket = new Ticket(body);
		return ticket.save();
	},
	updateTicket: (body, new_body) => {
		const newTicket = Object.assign(body, new_body);
		return newTicket.save();
	},
};
