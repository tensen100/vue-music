const router = require('koa-router')();
const controller = require('../controller/singer');
router.prefix('/api');

// 歌手列表
router.get('/getSingerList', controller.getSingerList);

// 歌手详情
router.get('/getSingerDetail/:id', controller.getSingerDetail);

module.exports = router;