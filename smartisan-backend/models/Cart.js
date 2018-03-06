const Sequelize = require('sequelize');
const db = require('../utils/db');
const CartSchema = require('../schemas/Cart');

/*
* 查询指定用户的所有购物车的商品
* */
module.exports.getAllByUid = async uid => {

    uid = Number(uid);

    let data = await db.query(
		"SELECT C.id,C.uid,C.itemId,C.quantity,C.checked,I.pid,I.title,I.subTitle,I.name,I.price,I.stock,I.colorStyle,I.cover FROM `cart` as C,`item` as I where C.uid=:uid AND I.id = C.itemId OR I.id = I.pid",
		{
			replacements: {
				uid
			},
			type: Sequelize.QueryTypes.SELECT
		}
	);
	if (data.length) {
		let ids = data.map( rs => rs.pid );
		ids = [...new Set(ids)];
		let parentItems = await db.query(
			"SELECT I.id,I.title,I.subTitle FROM `item` as I where `id` in (:ids)",
			{
			    replacements: {
			        ids
                },
				type: Sequelize.QueryTypes.SELECT
			}
		);

		data.forEach( item => {
		    let pi = parentItems.find( pi => pi.id == item.pid );
		    if (pi) {
		        item.title = pi.title;
		        item.subTitle = pi.subTitle;
            }
            return item;
        } );
	}

    return data;
};

/**
 * 添加商品到指定用户的购物车
 */
module.exports.add = async (uid, itemId, quantity) => {
    uid = Number(uid);
	itemId = Number(itemId);
	quantity = Number(quantity) || 1;

    let data = await CartSchema.findOne({
        where: {
            uid,
            itemId
        }
    });
    if (!data) {
		data = await CartSchema.create({
            uid,
            itemId
        });
    } else {
        data.quantity = data.get('quantity') + quantity;
		await data.save();
    }

    return data;
};

/**
 * 减持购物车中商品数量
 */
module.exports.reduce = async (uid, itemId, cartId, quantity) => {
    uid = Number(uid);
    itemId = Number(itemId);
    cartId = Number(cartId);
    quantity = Number(quantity);

    let where = {uid};
    if (cartId) {
        where.id = cartId;
    } else {
        where.itemId = itemId;
    }

    let data = await CartSchema.findOne({
        where
    });

    if (data) {
        let newQuantity = data.get('quantity') - quantity;
        if (newQuantity < 1) {
            newQuantity = 1;
        }
        data.quantity = newQuantity
        data = await data.save();
    }

    return data;
};

/**
 * 修改
 */
module.exports.edit = async (uid, itemId, cartId, quantity) => {
    uid = Number(uid);
    itemId = Number(itemId);
    cartId = Number(cartId);
    quantity = Number(quantity);

    let where = {uid};
    if (cartId) {
        where.id = cartId;
    } else {
        where.itemId = itemId;
    }

    let data = await CartSchema.findOne({
        where
    });

    if (data) {
        if (quantity > 0) {
            data.quantity = quantity;
        }
        data = await data.save();
    }

    return data;
};

/*
* 选中/取消选中购物车中商品
* */
module.exports.checked = async (uid, cartId, checked) => {
    uid = Number(uid);
    switch (typeof cartId) {
		case 'string':
			cartId = cartId.split(',');
			break;
		default:
			cartId = [cartId];
			break;
	}
    checked = Boolean(checked);

    const [affectedCount, affectedRows] = await CartSchema.update(
        {
            checked
        },
        {
            where: {
                [Sequelize.Op.and]: [
                    {
                        uid
                    },
                    {
                        id: {
                            [Sequelize.Op.in]: cartId
                        }
                    }
                ]
            }
        }
    );
    return {affectedCount, affectedRows};
};

/*
* 删除指定商品
* */
module.exports.delete = async (uid, cartId) => {
	switch (typeof cartId) {
		case 'string':
			cartId = cartId.split(',');
			break;
		default:
			cartId = [cartId];
			break;
	}
    return await CartSchema.destroy({
        where: {
            [Sequelize.Op.and]: [
                {
                    uid
                },
                {
                    id: {
                        [Sequelize.Op.in]: cartId
                    }
                }
            ]
        }
    });
};

/*
* 清空指定用户购物车
* */
module.exports.clear = async uid => {
    return await CartSchema.destroy({
        where: {
            uid
        }
    });
};