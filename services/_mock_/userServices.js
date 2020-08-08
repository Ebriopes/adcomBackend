const Services = jest.genMockFromModule('../userServices')

function create(body){
	const keys = ['name', 'email', 'password'];

	const newUser = {
		"id":			"skjfhaslkfh",
		"name": 		"Daniel",
		"last_name":	"Vargas",
		"email": 		"eeeeoh@gmail.com",
		"password": 	"EsoQueEs",
		"phone":		5529397786,
		"is_active":	true,
	}

	const dataBase = new Promise((resolve,reject) => {
		if(keys.every((key) =>  Object.keys(body).includes(key))){
			resolve(newUser);
		} else {
			reject(new Error('Server error'));
		}
	})

	return dataBase;
}

Services.createUser = create;

module.exports = Services;