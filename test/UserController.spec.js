jest.mock('../services/userServices', () => jest.requireActual('../services/_mock_/userServices'));

const userController = require('../controllers/userController');

describe('User test group', () => {
	describe('Create user', () => {
		it('Create', async()=> {
			const res = {
				status: jest.fn().mockReturnThis(),
				send:	jest.fn()
			}
			const req = {
				body:{
					name: "Daniel",
					email: "qweqeq@gmail.com",
					password: "asdkhwdf",
				}
			}

			await userController.createUser(req, res);
			expect(res.status.mock.calls).toEqual([[201]]);
			expect(res.send.mock.calls).toEqual([[
				{user: expect.objectContaining({is_active: true})}
			]]);
		})
	})
})
