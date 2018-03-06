const Sequelize = require('sequelize');
const AddressSchema = require('../schemas/Address');

/**
 * 获取指定用户的所有地址
 * @param uid
 * @returns {Promise.<*>}
 */
module.exports.getAll = async uid => {

	uid = Number(uid);

	return await AddressSchema.findAll({
		where: {
			uid
		}
	});

};

/**
 * 获取指定id的地址
 * @param id
 * @returns {Promise.<*>}
 */
module.exports.getById = async id => {

	id = Number(id);

	return await AddressSchema.findById(id);

};

/**
 * 添加地址信息
 * @param data
 * @returns {Promise.<data>}
 */
module.exports.add = async data => {
	data.uid = Number(data.uid);

	if (data.isDefault) {
        await AddressSchema.update({
            isDefault: false
        }, {
            where: {
                uid: data.uid
            }
        });
    }

	return await AddressSchema.create( data );
};

/**
 * 修改地址信息
 * @param data
 * @returns {Promise.<data>}
 */
module.exports.edit = async (id, data) => {
	id = Number(id);
	data.uid = Number(data.uid);

	let address = await AddressSchema.findOne({
		where: {
			id,
			uid: data.uid
		}
	});

    if (data.isDefault) {
        await AddressSchema.update({
            isDefault: false
        }, {
            where: {
                uid: data.uid
            }
        });
    }

	if (address) {
		for (property in data) {
			address[property] = data[property];
		}
	}

	return await address.save();
};

/*
* 设置默认
* */
module.exports.setDefault = async (uid, id) => {

    uid = Number(uid);
    id = Number(id);

    await AddressSchema.update({
        isDefault: false
    }, {
        where: {
            uid
        }
    });

    return await AddressSchema.update({
        isDefault: true
    }, {
        where: {
            id,
            uid
        }
    });
};

/**
 * 删除地址
 * @param uid
 * @param id
 * @returns {Promise.<*>}
 */
module.exports.delete = async (uid, id) => {
    uid = Number(uid);

    switch (typeof id) {
        case 'string':
            id = id.split(',');
            break;
        default:
            id = [id];
            break;
    }

	return await AddressSchema.destroy({
		where: {
			[Sequelize.Op.and]: [
				{
					uid
				},
				{
					id: {
						[Sequelize.Op.in]: id
					}
				}
			]
		}
	});
};
