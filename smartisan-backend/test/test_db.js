// const db = require('../common/Db');
const User = require('../schemas/User');

// db.sync()
// 	.then(() => User.create({
// 		username: 'zMouse',
// 		password: 'shire'
// 	}))
// 	.then( user => {
// 		console.log(user.toJSON());
// 	});

User.findOne({
    attributes: ['id', 'userName'],
    where: {
        id: 1
    }
}).then(user=> {
    console.log(user.get());
});