const router = require('koa-router')();
const controller = require('../controller/rank');
router.prefix('/api');

// 热门关键词
router.get('/getTopList', controller.getTopList);

// 搜索
router.get('/getMusicList/:id', controller.getMusicList);

module.exports = router;