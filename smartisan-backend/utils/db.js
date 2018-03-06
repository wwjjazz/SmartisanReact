const Sequelize = require('sequelize');
const config = require('../configs/db.config');

module.exports = new Sequelize(config);