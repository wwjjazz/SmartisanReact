const UserSchema = require('../schemas/User');
const md5 = require('blueimp-md5');

/*
* 登录
* */
module.exports.login = async (username, password) => {

    return await UserSchema.findOne({
        where: {
            username: username,
            password: md5(password)
        }
    });
};