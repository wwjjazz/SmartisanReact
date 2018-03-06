const OrderSchema = require('../schemas/Order');
const CartModel = require('../models/Cart');
const AddressModel = require('../models/Addredss');
const utils = require('../utils');

const host = '127.0.0.1';
const port = 9999;
const staticPath = 'public/';
const url = `http://${host}:${port}/`;
const staticUrl = url + staticPath;
const attachmentUrl = staticUrl + 'attachments/';

/*
* 获取指定用户的所有订单
* */
module.exports.getAllById = async uid => {

    uid = Number(uid);

    let data = await OrderSchema.findAll({
        where: {
            uid
        }
    });

    data.forEach( order => {
        order.items = order.items.map( item => {
            item.color = attachmentUrl + item.color;
            item.cover = attachmentUrl + item.cover;

            return item;
        } );
    } );

    return data;

};

/*
* 添加订单
* */
module.exports.add = async (uid, addressId) => {

    uid = Number(uid);
    addressId = Number(addressId);

    const allItems = await CartModel.getAllByUid(uid);
    const items = allItems.filter( item => item.checked ).map( item => {
        return {
            orderId: item.id,
            itemId: item.itemId,
            title: item.title,
            subTitle: item.subTitle,
            name: item.name,
            color: item.color,
            cover: item.cover,
            quantity: item.quantity,
            price: item.price
        };
    } );

    if (!items.length) {
        return false;
    }
    const address = await AddressModel.getById(addressId);

    if (!address) {
        return false;
    }

    const data = await OrderSchema.create({
        code: utils.createOrderCode(uid),
        uid,
        freight: 10,
        items,
        address
    });

    if (data) {
        await CartModel.delete(uid, items.map(item=>item.orderId).join(','));
    }

    data.items = data.items.map( item => {
        item.color = attachmentUrl + item.color;
        item.cover = attachmentUrl + item.cover;

        return item;
    } );

    return data;
};

module.exports.payment = async (uid, id) => {
    uid = Number(uid);
    id = Number(id);
    let order = await OrderSchema.findOne({
        where: {
            uid,
            id
        }
    });
    if (order) {
        order.status = 1;
        let data = await order.save();

        data.items = data.items.map( item => {
            item.color = attachmentUrl + item.color;
            item.cover = attachmentUrl + item.cover;

            return item;
        } );

        return data;
    }
};