const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.define('profile', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    // 用户id
    uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    // 用户头像
    avatar: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    // 昵称
    nickName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    // 手机
    mobilePhone: {
        type: Sequelize.STRING(11),
        allowNull: false
    }
}, {
    timestamp: false,
    indexes: [
        {
            unique: true,
            fields: ['nickName', 'mobilePhone']
        }
    ],
    tableName: 'profile',
    comment: '用户账户资料表'
});