const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.define('item', {
    // 商品ID
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // 父级类商品
    pid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    // 商品名称
    title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
    },
    // 商品简介
    subTitle: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: ''
    },
    // 商品名称
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
    },
    // 价格，单位：分
    price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    // 库存
    stock: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    // 风格
    colorStyle: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
    },
    // 封面
    cover: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
    },
    // 相册
    album: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: ''
    }
}, {
    // 表名
    tableName: 'item',
    timestamps: false,
    // 索引
    // indexes: [
    //     {
    //         fields: ['pid', 'title', 'name']
    //     }
    // ],
    // 注释
    comment: '商品表'
});