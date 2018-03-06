const db = require('../utils/db');
const User = require('../schemas/User');
const Address = require('../schemas/Address');
const Item = require('../schemas/Item');
const Cart = require('../schemas/Cart');
const Order = require('../schemas/Order');

const utils = require('../utils');

const needCreateDataTables = ['user', 'address', 'item', 'cart', 'order'];

/**
 * 用户数据 - user
 */
if ( needCreateDataTables.includes('user') ) {
	User.sync({force: true}).then( () => {
		User.bulkCreate([
			{userName: 'zMouse', passWord: '12345' },
			{userName: 'mt', passWord: '12345' },
			{userName: 'reci', passWord: '12345' },
			{userName: 'tb', passWord: '12345' },
			{userName: 'xj', passWord: '12345' }
		]).then( () => {
			return User.findAll();
		} ).then( users => {
			console.log(`user 表操作成功：一共创建了 ${users.length} 条数据`);
		} );
	} );
}

/**
 * 用户收货地址数据 - address
 */
if ( needCreateDataTables.includes('address') ) {
	Address.sync({force: true}).then( () => {
		Address.bulkCreate([
			{
				uid: 1,
				userName: '钟毅',
				telephone: '15800000000',
				areaCode: '021',
				phone: '11111111',
				province: '上海市',
				city: '市辖区',
				district: '闵行区',
				street: '七宝宝龙城T4座905'
			},
			{
				uid: 2,
				userName: '莫涛',
				telephone: '15800000001',
				areaCode: '021',
				phone: '11111111',
				province: '上海市',
				city: '市辖区',
				district: '闵行区',
				street: '七宝宝龙城T4座905'
			},
			{
				uid: 2,
				userName: '莫涛',
				telephone: '15800000001',
				areaCode: '010',
				phone: '44444444',
				province: '北京市',
				city: '市辖区',
				district: '海淀区',
				street: '西二旗辉煌国际'
			},
			{
				uid: 3,
				userName: '朱王洁',
				telephone: '15800000003',
				areaCode: '010',
				phone: '33333333',
				province: '上海市',
				city: '市辖区',
				district: '闵行区',
				street: '七宝宝龙城T4座905'
			}
		]).then( () => {
			return Address.findAll();
		} ).then( address => {
			console.log(`address 表操作成功：一共创建了 ${address.length} 条数据`);
		} );
	} );
}

/**
 * 商品 - item
 */
if (needCreateDataTables.includes('item')) {
    Item.sync({force: true}).then( () => {
        Item.bulkCreate([
            {
                title: "坚果 Pro 2 文青保护套",
                subTitle: "文青配色、质感精良",
            },
            {
                pid: 1,
                name: "苏芳",
                price: 9900,
                stock: 9999,
                colorStyle: "1-sufang.jpg",
                cover: "1-sufang-cover.webp",
                album: [
                    "1-sufang-album-1.webp",
                    "1-sufang-album-2.webp",
                    "1-sufang-album-3.webp",
                    "1-sufang-album-4.webp",
                    "1-sufang-album-5.webp"
                ]
            },
            {
                pid: 1,
                name: "远州鼠",
                price: 10500,
                stock: 9999,
                colorStyle: "1-yuanzhoushu.jpg",
                cover: "1-yuanzhoushu-cover.webp",
                album: [
                    "1-yuanzhoushu-album-1.webp",
                    "1-yuanzhoushu-album-2.webp",
                    "1-yuanzhoushu-album-3.webp",
                    "1-yuanzhoushu-album-4.webp"
                ]
            },
            {
                pid: 1,
                name: "柳煤竹茶",
                price: 11000,
                stock: 9999,
                colorStyle: "1-liumeizhucha.jpg",
                cover: "1-liumeizhucha-cover.webp",
                album: [
                    "1-liumeizhucha-album-1.webp",
                    "1-liumeizhucha-album-2.webp",
                    "1-liumeizhucha-album-3.webp",
                    "1-liumeizhucha-album-4.webp"
                ]
            },
            {
                title: "坚果 Pro 2 软胶保护套",
                subTitle: "TPU 环保材质、完美贴合",
            },
            {
                pid: 5,
                name: "红色",
                price: 4900,
                stock: 9999,
                colorStyle: "2-red.jpg",
                cover: "2-red-cover.png",
                album: [
                    "2-red-album-1.png",
                    "2-red-album-2.png",
                    "2-red-album-3.png",
                    "2-red-album-4.png",
                    "2-red-album-5.png"
                ]
            },
            {
                pid: 5,
                name: "黑色",
                price: 4900,
                stock: 9999,
                colorStyle: "2-black.jpg",
                cover: "2-black-cover.png",
                album: [
                    "2-black-album-1.png",
                    "2-black-album-2.png",
                    "2-black-album-3.png"
                ]
            }
        ]).then( () => {
            return Item.findAll();
        } ).then( Item => {
            console.log(`item 表操作成功：一共创建了 ${Item.length} 条数据`);
        } );
    } );
}

/*
* 购物车
* */
if (needCreateDataTables.includes('cart')) {
    Cart.sync({force: true}).then( () => {
        Cart.bulkCreate([
            {
                uid: 1,
                itemId: 2,
                quantity: 1,
                checked: 1
            },
            {
                uid: 1,
                itemId: 3,
                quantity: 1,
                checked: 1
            },
            {
                uid: 2,
                itemId: 1,
                quantity: 2
            },
            {
                uid: 3,
                itemId: 3,
                quantity: 4
            }
        ]).then( () => {
            return Cart.findAll();
        } ).then( cart => {
            console.log(`cart 表操作成功：一共创建了 ${cart.length} 条数据`);
        } );
    } );
}

/*
* 订单
* */
if (needCreateDataTables.includes('order')) {
    Order.sync({force: true}).then( () => {
        Order.bulkCreate([
            {
                code: utils.createOrderCode(1),
                uid: 1,
                status: 0,
                freight: 10,
                items: [
                    {
                        itemId: 3,
                        title: "坚果 Pro 2 文青保护套",
                        subTitle: "文青配色、质感精良",
                        name: "远州鼠",
                        color: "1-yuanzhoushu.jpg",
                        cover: "1-yuanzhoushu-cover.webp",
                        quantity: 2,
                        price: 99.00
                    },
                    {
                        itemId: 4,
                        title: "坚果 Pro 2 文青保护套",
                        subTitle: "文青配色、质感精良",
                        name: "柳煤竹茶",
                        color: "1-liumeizhucha.jpg",
                        cover: "1-liumeizhucha-cover.webp",
                        quantity: 1,
                        price: 99.00
                    }
                ],
                address: {
                    uid: 1,
                    userName: '钟毅',
                    telephone: '15800000000',
                    areaCode: '021',
                    phone: '11111111',
                    province: '上海市',
                    city: '市辖区',
                    district: '闵行区',
                    street: '七宝宝龙城T4座905'
                }
            }
        ]).then( () => {
            return Order.findAll();
        } ).then( Item => {
            console.log(`order 表操作成功：一共创建了 ${Order.length} 条数据`);
        } );
    } )
}