/**
 * 登录用户验证
 * @param req
 * @param res
 * @param next
 */
const verifyLoginUser = (req, res, next) => {

	if ( !req.cookies.uid ) {
		res.json({
			code: -1,
			data: '你还没有登录，无权限进行此操作'
		});
		return;
	}

	next();
};

/*
* 生成order code
* */
const createOrderCode = (id) => {
    const date = new Date();
    const M = date.getMonth()+1;
    const D = date.getDate();
    const H = date.getHours();
    const I = date.getMinutes();
    const S = date.getSeconds();

    return '' + date.getFullYear() + (M > 9 ? M : '0' + M) + (D > 9 ? D : '0' + D) + (H > 9 ? H : '0' + H) + (I > 9 ? I : '0' + I) + (S > 9 ? S : '0' + S) + date.getTime() + id;
};

module.exports = {
	verifyLoginUser,
    createOrderCode
};