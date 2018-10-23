const axios = require('axios');

const config = require('../config');

// 歌词
exports.getLyric = async (ctx) => {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';

    const params = {
        ...config.commonParams,
        songmid: ctx.params.id,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        pcachetime: +new Date(),
        format: 'json'
    };
    const res = await axios.get(url, {
        headers: config.headers,
        params: params
    });
    let ret = res.data;
    if (typeof ret === 'string') {
        const reg = /^\w+\(({[^()]+})\)$/;
        const matches = ret.match(reg);
        if (matches) {
            ret = JSON.parse(matches[1])
        }
    }
    ctx.body = ret;
};

exports.getMusic = async (ctx) => {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?_=1538621289168';

    const params = {
        comm: {
            ...config.commonParams,
            uin: 0,
            platform: "h5",
            needNewCode: 1
        },
        detail: {
            module: "music.pf_song_detail_svr",
            method: "get_song_detail",
            param: {
                song_id: ctx.params.id
            }
        },
    };
    const res = await axios.get(url, {
        headers: config.headers,
        params: params
    });
    ctx.body = res.data;
};

exports.getSongUrls = async (ctx) => {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?_='+ Date.now();
    const params = {
        req: {
            module: "vkey.GetVkeyServer",
            method: "CgiGetVkey",
            param: {
                guid: "6202779200",
                songmid: [
                    "001Qu4I30eVFYb",
                    "0024vbNZ4bQz74",
                    "0032ZOkm0LBgHW",
                    "001TXSYu1Gwuwv",
                    "003FFWnA3AIczD",
                    "000QwTVo0YHdcP",
                    "003v4UL61IYlTY",
                    "002BWGZQ2UKjKn",
                    "001CG3wA3QkuJS",
                    "003TfyNp47dm7E",
                    "004dADLe4ec8RG",
                    "000QCwge3B6Ad1",
                    "004VBMk71TdUuR",
                    "001hUNRP0P8g7x",
                    "001RlxZp1xwoNK"
                ],
                songtype: [],
                uin: "0",
                loginflag: 0,
                platform: "23",
                h5to: "speed"
            }
        },
        "comm": {
            "g_tk": 5381,
            "uin": 0,
            "format": "json",
            "ct": 23,
            "cv": 0
        }
    };
    const res = await axios.post(url, params);
    ctx.body = res.data;
};