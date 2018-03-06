const ItemSchema = require('../schemas/Item');

/**
 * 查询所有商品
 * @returns Promise
 */
module.exports.getAll = () => {
	return ItemSchema.findAll();
};

/**
 * 查询指定 ID 的商品
 */
module.exports.getById = id => {
	return ItemSchema.findById(id);
};