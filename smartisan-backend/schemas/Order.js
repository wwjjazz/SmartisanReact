const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.define('order', {
    // 订单ID
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // 订单号
    code: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    // 用户ID
    uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    // 订单状态
    status: {
        // 0：待支付，1：已支付，2：待收货，3：已取消
        type: Sequelize.ENUM(0,1,2),
        allowNull: false,
        defaultValue: 0
    },
    // 运费
    freight: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    // 下单时间
    orderTime: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        defaultValue: Date.now()
    },
    // 商品
    items: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: ''
    },
    // 收货地址
    address: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: ''
    }
}, {
    // 表名
    tableName: 'order',
    timestamps: false,
    // 索引
    indexes: [
        {
            unique: true,
            fields: ['code']
        },
        {
            fields: ['uid']
        },
        {
            fields: ['status']
        }
    ],
    // 注释
    comment: '订单表'
});