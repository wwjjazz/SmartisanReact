const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.define('cart', {
    // ID
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // 用户ID
    uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    // 商品ID
    itemId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    // 数量
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    },
    // 是否选中
    checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'cart',
    indexes: [
        {
            fields: ['itemId']
        },
        {
            fields: ['uid']
        },
        {
            fields: ['checked']
        }
    ],
    timestamps: false,
    comment: '购物车表'
});