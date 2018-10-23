const router = require('koa-router')();
const controller = require('../controller/song');
router.prefix('/api');

// 歌词
router.get('/getLyric/:id', controller.getLyric);

router.get('/music/:id', controller.getMusic);

router.get('/songUrl', controller.getSongUrls);

module.exports = router;