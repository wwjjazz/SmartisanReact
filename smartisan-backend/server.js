const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const configs=  require('./configs/server.config');

const server = express();

const mainModule = require('./modules/main');
const itemModule = require('./modules/item');
const userModule = require('./modules/user');
const cartModule = require('./modules/cart');
const orderModule = require('./modules/order');

/*
* 处理静态文件
* */
server.use( '/public', express.static(configs.staticPath) );

/*
* 处理post提交的urlencode数据
* */
server.use( bodyParser.urlencoded({ extended: true }) );
server.use( bodyParser.json() );

/*
* 处理cookie
* */
server.use( cookieParser() );

server.use( (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    if(req.method==="OPTIONS") res.send(200);/*让options请求快速返回*/

    next();
} );


/**
 * 商品
 */
server.use('/item', itemModule);

/**
 * 用户
 */
server.use('/user', userModule);

/**
 * 购物车
 */
server.use('/cart', cartModule);

/**
 * 订单
 */
server.use('/order', orderModule);

/**
 * 主页
 */
server.use('/', mainModule);

/**
 * 错误处理
 */
server.use( (req, res) => {
	res.json({
		code: -2,
		message: '请求错误'
	});
} );

server.listen(configs.port, configs.host, () => {
    console.log('Server is started on 9999, click here -> http://localhost:9999 to open default browser!');
});