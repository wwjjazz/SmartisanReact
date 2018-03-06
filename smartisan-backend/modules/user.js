const express = require('express');
const UserModel = require('../models/User');
const AddressModel = require('../models/Addredss');
const utils = require('../utils');

const router = express.Router();

router.all('/verify', utils.verifyLoginUser, (req, res) => {
    res.json({
        code: 0,
        data: {
            uid: req.cookies.uid,
            username: req.cookies.username
        }
    })
});

/*
 * 用户登录
 * @Method POST
 * @Url /user/login
 * @Data username 用户名
 * @Data password 密码
 * @Return {Object} 登录成功后的用户信息，同时返回 cookie
 * 	data: {
 * 		uid: 登录用户ID,
 * 		username: 登录用户名
 * 	}
 * 	cookie: uid={uid}; username={username}
 * */
router.post('/login', async (req, res) => {

	const username = req.body.username || '';
	const password = req.body.password || '';

	if ( req.cookies.uid ) {
		res.json({
			code: 1,
			data: '你已经登录了，请勿重复登录'
		});
		return;
	}

	if (!username || !password) {
		res.json({
			code: 2,
			data: '缺少参数'
		});
		return;
	}

    const user = await UserModel.login(username, password);

    if (!user) {
        res.json({
            code: 3,
            data: '不存在该用户或者密码错误'
        });
        return;
    }

    // 设置登录用户cookie
    const maxAge = 3600 * 1000 * 24;
    res.cookie('uid', user.id, { maxAge, httpOnly: true } );
    res.cookie('username', user.userName, { maxAge, httpOnly: true } );

    res.json({
        code: 0,
        data: {
            uid: user.id,
            username: user.userName
        }
    });

});

/**
 * 退出
 * @Method POST
 * @Url /user/logout
 */
router.all('/logout', utils.verifyLoginUser, (req, res) => {
	res.cookie('uid', '', {maxAge: -1, httpOnly: true});
	res.cookie('username', '', {maxAge: -1, httpOnly: true});

	res.json({
		code: 0,
		data: '成功退出'
	});
});

/*
 * 我的地址
 * @Method GET
 * @Url /user/address
 * @params id 用户地址id
 * @Return {Object}
 * */
router.get('/address', utils.verifyLoginUser, async (req, res) => {

	const addressId = req.query.id;

	let data;

	if (!addressId) {
		data = await AddressModel.getAll(req.cookies.uid);
	} else {
		data = await AddressModel.getById(addressId);
	}

	res.json({
		code: 0,
		data
	});

});

/*
 * 我的地址 - 添加
 * @Method POST
 * @Url /user/address/add
 * @params	user_name
 * 			telephone
 * 			areaCode
 * 			phone
 * 		    province
 * 		    city
 * 		    district
 * 		    street
 * 		    is_default
 * @Return {Object}
 * */
router.post('/address/add', utils.verifyLoginUser, async (req, res) => {
	const uid = req.cookies.uid;
	const userName = req.body.user_name;
	const telephone = req.body.telephone;
	const areaCode = req.body.area_code;
	const phone = req.body.phone;
	const province = req.body.province;
	const city = req.body.city;
	const district = req.body.district;
	const street = req.body.street;
	const isDefault = req.body.is_default;

	let addData = {
		uid
	};
	if (userName) {
		addData.userName = userName;
	}
	if (telephone) {
		addData.telephone = telephone;
	}
	if (areaCode) {
		addData.areaCode = areaCode;
	}
	if (phone) {
		addData.phone = phone;
	}
	if (province) {
		addData.province = province;
	}
	if (city) {
		addData.city = city;
	}
	if (district) {
		addData.district = district;
	}
	if (street) {
		addData.street = street;
	}
	if (isDefault) {
        addData.isDefault = isDefault;
	}

	const data = await AddressModel.add(addData);

	res.json({
		code: 0,
		data
	});
});

/*
 * 我的地址 - 修改
 * @Method POST
 * @Url /user/address/edit
 * @params  id 用户地址id
 *          user_name
 * 			telephone
 * 			areaCode
 * 			phone
 * 		    province
 * 		    city
 * 		    district
 * 		    street
 * 		    is_default
 * @Return {Object}
 * */
router.post('/address/edit', utils.verifyLoginUser, async (req, res) => {
	const id = req.body.id;
	const uid = req.cookies.uid;
	const userName = req.body.user_name;
	const telephone = req.body.telephone;
	const areaCode = req.body.area_code;
	const phone = req.body.phone;
	const province = req.body.province;
	const city = req.body.city;
	const district = req.body.district;
	const street = req.body.street;
	const isDefault = req.body.is_default;

	let addData = {
		uid
	};
	if (userName) {
		addData.userName = userName;
	}
	if (telephone) {
		addData.telephone = telephone;
	}
	if (areaCode) {
		addData.areaCode = areaCode;
	}
	if (phone) {
		addData.phone = phone;
	}
	if (province) {
		addData.province = province;
	}
	if (city) {
		addData.city = city;
	}
	if (district) {
		addData.district = district;
	}
	if (street) {
		addData.street = street;
	}
    if (isDefault) {
        addData.isDefault = isDefault;
    }

	const data = await AddressModel.edit(id, addData);

	res.json({
		code: 0,
		data
	});
});

/*
* 我的地址 - 设置默认
* @Method - ALL
* @Url /user/address/set_default
* @params id 用户地址id
* @Return {Object}
* */
router.all('/address/set_default', utils.verifyLoginUser, async (req, res) => {
    const id = req.query.id || req.body.id;

    const data = await AddressModel.setDefault( req.cookies.uid, id );

    res.json({
        code: 0,
        data: {result: Boolean(data[0])}
    });
});

/*
 * 我的地址 - 删除
 * @Method ALL
 * @Url /user/address/delete
 * @params id 用户地址id
 * @Return {Object}
 * */
router.all('/address/delete', utils.verifyLoginUser, async (req, res) => {
	const ids = req.query.id || req.body.id;

	const data = AddressModel.delete( req.cookies.uid, ids );

	res.json({
		code: 0,
		data
	});
});

module.exports = router;