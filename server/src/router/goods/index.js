const { Router } = require('express');
const { HTTP } = require('../../libs/http');
const resolveFile = require('./resolveFile');

const router = Router();

const [readTaobaoGoods, writeTaobaoGoods] = resolveFile({
	filename: 'taobao_goods.json'
});

router.get('/', (req, res) => {
	res.send({
		code: 200,
		status: 'Success'
	});
});

router.get('/get-goods-list', (req, res) => {
	const {
		page = 1,
		page_size = 10,
	} = req.query;

	const goods = readTaobaoGoods();

	const startIdx = page_size * (page - 1),
				endIdx = page_size * page;

  const data = goods.slice(startIdx, endIdx);

	res.send({
		data,
		page: Number(page),
		page_size: Number(page_size),
		total: goods.length,
		status: 'Success',
		code: 200,
	});
});

module.exports = router;
