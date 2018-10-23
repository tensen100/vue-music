const axios = require('axios');
const config = require('../config');
const { getSongUrls, filterSinger } = require('../tools/song');
const TYPE_SINGER = 'singer';

// 热门关键词
exports.getHotKey = async ctx => {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

    const params = {
        ...config.commonParams,
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    };
    const res = await axios.get(url, {
        params: params
    });
    ctx.body = res.data;
};

// 搜索
exports.search = async ctx => {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    const { query, page, zhida, perpage } = ctx.query;
    const params = {
        ...config.commonParams,
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    };
    const {code,data} = (await axios.get(url, {
        headers: config.headers,
        params: params
    })).data;

    const origin = {res:data};
    const pageData = {};

    let ret = [];
    if (code === config.ERR_OK) {
        const zhida = data.zhida;
        if (zhida && zhida.singerid) {
            ret.push({...zhida, type: TYPE_SINGER,id:zhida.singerid})
        }
        const songs = data.song;
        if (songs) {
            const songRet = [];
            const songIds = [];
            pageData.curnum = songs.curnum;
            pageData.curpage = songs.curpage;
            pageData.totalnum = songs.totalnum;
            songs.list.forEach( musicData => {
                songRet.push({
                    id: musicData.songid,
                    mid: musicData.songmid,
                    singer: filterSinger(musicData.singer),
                    name: musicData.songname,
                    album: musicData.albumname,
                    duration: musicData.interval,
                    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
                });
                songIds.push(musicData.songmid)
            });
            const {urls, req} = await getSongUrls(songIds);
            origin.req = req;

            urls.forEach( (url,idx) => {
                songRet[idx].url = url
            });
            ret = ret.concat(songRet)
        }
    }


    ctx.body = {
        code,
        list: ret,
        origin,
        pageData
    };
};
/*
_genResult(data) {
    let ret = [];
    if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
    }
    if (data.song) {

        ret = ret.concat(this._normalizeSongs(data.song.list))
    }
    return ret
},
_normalizeSongs(list) {
    const ret = [];
    list.forEach( musicData => {
        if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
        }
    })
},*/
