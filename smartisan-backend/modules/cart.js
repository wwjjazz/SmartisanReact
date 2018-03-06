const express = require('express');
const utils = require('../utils');
const CartModel = require('../models/Cart');
const configs = require('../configs/server.config');

const router = express.Router();

/*
 * 获取当前登录用户的购物车信息
 * @Method ALL
 * @Url /cart
 * @Return [Array] 商品列表数组
 * */
router.all('/', utils.verifyLoginUser, async (req, res) => {

    let data = await CartModel.getAllByUid( req.cookies.uid );

    data = data.map( item => {
        item.checked = !!item.checked;
    	item.color = configs.attachmentUrl + item.colorStyle;
    	item.cover = configs.attachmentUrl + item.cover;
    	return item;
	} );

    res.json({
        code: 0,
        data
    });
});

/*
 * 添加商品到购物车
 * @Method POST
 * @Url /cart/add
 * @params item_id 要添加的商品id
 * @params quantity 要添加的商品的数量
 * @Return {Object}
 * */
router.post('/add', utils.verifyLoginUser, async ( req, res ) => {
	const itemId = req.body.item_id;
	const quantity = req.body.quantity;

	if (!itemId) {
		res.json({
			code: 1,
			data: '请传入商品ID或者购物车ID'
		});
		return;
	}

	const data = await CartModel.add(req.cookies.uid, itemId, quantity);

	res.json({
		code: 0,
		data: data
	});
});

/*
 * 减持购物车中的商品数量
 * @Method POST
 * @Url /cart/reduce
 * @params item_id 要减持的商品id
 * @params cart_id 要减持的购物车id，优先级低于item_id
 * @params quantity 要减持的商品的数量
 * @Return {Object}
 * */
router.post('/reduce', utils.verifyLoginUser, async ( req, res ) => {
    const itemId = Number(req.body.item_id);
    const cartId = Number(req.body.cart_id);
    const quantity = Number(req.body.quantity) || 1;

    if (!itemId && !cartId) {
        res.json({
            code: 1,
            data: '请传入商品ID或者购物车ID'
        });
        return;
    }

    const data = await CartModel.reduce(req.cookies.uid, itemId, cartId, quantity);

    res.json({
        code: 0,
        data: data
    });
});

/*
 * 添加商品到购物车
 * @Method POST
 * @Url /cart/edit
 * @params item_id 要添加的商品id
 * @params quantity 要修改的商品的数量
 * @Return {Object}
 * */
router.post('/edit', utils.verifyLoginUser, async ( req, res ) => {
    const itemId = Number(req.body.item_id);
    const cartId = Number(req.body.cart_id);
    const quantity = Number(req.body.quantity);

    if (!itemId && !cartId) {
        res.json({
            code: 1,
            data: '请传入商品ID或者购物车ID'
        });
        return;
    }

    if (!quantity || quantity < 1) {
        res.json({
            code: 2,
            data: '请传入正确的购买数量'
        });
        return;
    }

    const data = await CartModel.edit(req.cookies.uid, itemId, cartId, quantity);

    res.json({
        code: 0,
        data: data
    });
});

/*
 * 选中指定用户购物车中指定的商品
 * @Method POST
 * @Url /cart/checked
 * @params cart_id 购物车ID，多个id使用逗号分隔
 * @Return {Object}
 * */
router.post('/checked', utils.verifyLoginUser, async (req, res) => {
	const cartId = req.body.cart_id;
	const checked = req.body.checked;

    const data = await CartModel.checked( req.cookies.uid, cartId, checked );

	res.json({
		code: 0,
		data: {result: !!data.affectedCount}
	});
});


/*
 * 从购物车中删除指定商品
 * @Method ALL
 * @Url /cart/delete
 * @params cart_id 要删除的购物车ID，多件商品ID使用逗号分隔
 * @Return {Object}
 * */
router.all('/delete', utils.verifyLoginUser, async (req, res) => {
	const cartId = req.body.cart_id;

	if (!cartId) {
		res.json({
			code: 1,
			data: '请选择要删除的商品'
		});
		return;
	}

	const data = await CartModel.delete(req.cookies.uid, cartId);

	res.json({
		code: 0,
		data
	});
});

/*
 * 清空指定用户购物车
 * @Method ALL
 * @Url /cart/clear
 * @Return {Object}
 * */
router.all('/clear', utils.verifyLoginUser, (req, res) => {

	const data = CartModel.clear(req.cookies.uid);

	res.json({
		code: 0,
		data
	});
});

module.exports = router;