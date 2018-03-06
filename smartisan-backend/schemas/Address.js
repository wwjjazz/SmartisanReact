const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.define('address', {
	// 收货地址ID
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	// 关联用户ID
	uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	// 收货人姓名
	userName: {
		type: Sequelize.STRING(50),
		allowNull: false,
		defaultValue: ''
	},
	// 收货人手机号码
	telephone: {
		type: Sequelize.STRING(11),
		allowNull: false,
		defaultValue: ''
	},
	// 区号
	areaCode: {
		type: Sequelize.STRING(3),
		allowNull: false,
		defaultValue: ''
	},
	// 座机号码
	phone: {
		type: Sequelize.STRING(8),
		allowNull: false,
		defaultValue: ''
	},
	// 省、自治区、直辖市
	province: {
		type: Sequelize.STRING(100),
		allowNull: false,
		defaultValue: ''
	},
	// 市
	city: {
		type: Sequelize.STRING(100),
		allowNull: false,
		defaultValue: ''
	},
	// 区县
	district: {
		type: Sequelize.STRING(100),
		allowNull: false,
		defaultValue: ''
	},
	// 街道详细地址
	street: {
		type: Sequelize.STRING(100),
		allowNull: false,
		defaultValue: ''
	},
	// 是否默认
	isDefault: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	tableName: 'address',
	indexes: [
		{
			fields: ['uid']
		},
		{
			fields: ['isDefault']
		}
	],
	timestamps: false,
	comment: '用户收货地址表'
});