const express = require('express');
const ItemModel = require('../models/Item');
const configs = require('../configs/server.config');

const router = express.Router();

/*
 * 获取商品列表
 * @Method GET
 * @Url /item
 * @Return [Array] 商品列表数组
 * */
router.get('/', async (req, res) => {

	let items = await ItemModel.getAll();

	res.json({
		code: 0,
		data: items.map( item => {
			if (item.album) {
				item.album = item.album.map( album => {
					return configs.attachmentUrl + album;
				} )
			}
			return undefined === item.pid ? item : {
			    id: item.id,
                pid: item.pid,
			    name: item.name,
                subTitle: item.subTitle,
                title: item.title,
                price: item.price,
                stock: item.stock,
				color: configs.attachmentUrl + item.colorStyle,
				cover: configs.attachmentUrl + item.cover,
                album: item.album
			};
		} )
	});
});

/*
 * 获取指定商品详情
 * @Method GET
 * @Url /item/:id
 * @params id 要获取的商品ID
 * @Return {Object} 商品详情信息
 * */
router.get('/:id', async (req, res) => {
	const id = req.params.id || null;

	if (!id) {
		res.json({
			code: 1,
			data: '缺少参数'
		});
		return;
	}

	let data = await ItemModel.getById(id);

	if (!data) {
		res.json({
			code: 2,
			data: '不存在该商品信息'
		});
		return;
	}

	// let parentInfo = items.find( item => item.id == data.pid );
	//
	// res.json({
	// 	title: parentInfo.title,
	// 	sub_title: parentInfo.sub_title,
	// 	...data
	// });

	res.json({
		code: 0,
		data
	});
});

module.exports = router;