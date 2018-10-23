const router = require('koa-router')();
const controller = require('../controller/search');
router.prefix('/api');

// 热门关键词
router.get('/getHotKey', controller.getHotKey);

// 搜索
router.get('/search', controller.search);

module.exports = router;