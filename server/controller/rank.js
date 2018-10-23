const axios = require('axios');
const config = require('../config');
const { getSongUrls, filterSinger } = require('../tools/song');

// 排行
exports.getTopList = async ctx => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

    const params = {
        ...config.commonParams,
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
    };
    const res = await axios.get(url, {
        params: params
    });
    ctx.body = res.data;
};


exports.getMusicList = async ctx => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
    const {id} = ctx.params;
    const params = {
        ...config.commonParams,
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: id,
    };
    const res = (await axios.get(url,{
        params: params
    })).data;

    const ret = [];
    const origin = {res};

    if ( res.code === config.ERR_OK ) {
        const ids = [];
        res.songlist.forEach( song => {
            const musicData = song.data;
            if (musicData.songid && musicData.albummid) {
                ret.push({
                    id: musicData.songid,
                    mid: musicData.songmid,
                    singer: filterSinger(musicData.singer),
                    name: musicData.songname,
                    album: musicData.albumname,
                    duration: musicData.interval,
                    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
                });
                ids.push(musicData.songmid)
            }
        });

        const {urls, req} = await getSongUrls(ids);
        origin.req = req;

        urls.forEach( (url,idx) => {
            ret[idx].url = url
        })
    }
    ctx.body = {
        code: res.code,
        list: ret.filter( r => r.url), // 过滤掉付费歌曲
        origin: origin,
    };
};