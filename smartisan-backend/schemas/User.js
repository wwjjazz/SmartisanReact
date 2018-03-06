const Sequelize = require('sequelize');
const db = require('../utils/db');
const md5 = require('blueimp-md5');

module.exports = db.define('user', {
	// 用户ID
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	// 用户名
	userName: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	// 密码
	passWord: {
		type: Sequelize.STRING(32),
		allowNull: false,
		set(val) {
			this.setDataValue('passWord', md5( val ));
		}
	}
}, {
	tableName: 'user',
	// createdAt: 'createdAt',
	// updatedAt: 'updatedAt',
	// deletedAt: 'deletedAt',
	indexes: [
		{
			unique: true,
			fields: ['userName']
		}
	],
	timestamps: false,
	comment: '用户表'
});