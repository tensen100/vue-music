const router = require('koa-router')();
const controller = require('../controller/recommend');
router.prefix('/api');

// 推荐轮播
router.get('/getRecommend', controller.getRecommend);

// 推荐歌单
router.get('/getDiscList', controller.getDiscList);

// 歌曲列表
router.get('/getSongList/:id',controller.getSongList);

module.exports = router;