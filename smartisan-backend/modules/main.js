const express = require('express');

const router = express.Router();

/*
 * 首页
 * */
router.get( '/', (req, res) => {

	const maxAge = 3600 * 1000 * 24;
	res.cookie('uid', 1, { maxAge, httpOnly: true } );

	res.json({
		code: 0,
		message: '这是首页'
	});

} );

module.exports = router;