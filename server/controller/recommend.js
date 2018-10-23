const axios = require('axios');
const config = require('../config');
const { getSongUrls, filterSinger } = require('../tools/song');


// 推荐轮播
exports.getRecommend = async ctx => {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const params =  {
        ...config.commonParams,
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    };
    const res = await axios.get(url, {
        params: params
    });
    ctx.body = res.data
};

//歌单列表
exports.getDiscList = async ctx => {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    const params =  {
        ...config.commonParams,
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json',
        jsonpCallback: 'getPlaylist'
    };
    const res = await axios.get(url, {
        headers: config.headers,
        params: params
    });
    ctx.body = res.data
};

// 歌曲列表
exports.getSongList = async ctx => {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    const params = {
        ...config.commonParams,
        disstid: ctx.params.id,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        format:'json'
    };
    const res = (await axios.get(url, {
        headers: config.headers,
        params: params
    })).data;
    const ret = [];
    const origin = {res};

    if ( res.code === config.ERR_OK ) {
        const ids = [];
        res.cdlist[0].songlist.forEach( musicData => {
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
        list: ret,
        origin: origin
    }
};
