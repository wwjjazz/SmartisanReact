const express = require('express');
const utils = require('../utils');
const OrderModel = require('../models/Order');


const router = express.Router();

/*
 * 我的订单
 * @Method GET
 * @Url /order
 * @params uid 用户id
 * @Return {Object}
 * */
router.get('/', utils.verifyLoginUser, async (req, res) => {

    const data = await OrderModel.getAllById(req.cookies.uid);

	res.json({
        code: 0,
        data
	});
});

/*
* 创建订单
* */
router.post('/add', utils.verifyLoginUser, async (req, res) => {

	const addressId = req.body.address_id;
    const data = await OrderModel.add(req.cookies.uid, addressId);

    if (data) {
        res.json({
            code: 0,
            data
        });
    } else {
        res.json({
            code: 1,
            data: '订单添加失败'
        });
    }
});

/*
 * 支付
 * @Method POST
 * @Url /order/payment
 * @params id 订单id
 * @Return {Object}
 * */
router.post('/payment', utils.verifyLoginUser,  async (req, res) => {
	const id = req.body.id;

	const data = await OrderModel.payment(req.cookies.uid, id);

	if (!data) {
		res.json({
			code: 1,
			data: '订单支付失败'
		});
	} else {
		res.json({
			code: 0,
			data
		});
	}
});

module.exports = router;