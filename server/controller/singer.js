const axios = require('axios');
const config = require('../config');
const { getSongUrls, filterSinger } = require('../tools/song');


// 歌手列表
exports.getSingerList = async ctx => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

    const params = {
        ...config.commonParams,
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    };

    const res = await axios.get(url, {
        params: params
    });

    ctx.body = res.data
};

// 歌手详情
exports.getSingerDetail = async ctx => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

    const params = {
        ...config.commonParams,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: ctx.params.id
    };

    const {code,data} = (await axios.get(url, {
        params: params
    })).data;

    const origin = {res:data};
    const ret = [];
    if (code === config.ERR_OK) {

        const ids = [];
        data.list.forEach( item => {
            const { musicData } = item;
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
        code,
        list: ret,
        origin: origin
    }

};
