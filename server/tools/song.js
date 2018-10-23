const { ERR_OK } = require('../config');

const axios = require('axios');


/**
 * 根据id获取歌曲的播放地址
 * @param ids
 * @returns {Promise<*>}
 */
exports.getSongUrls = async (ids) => {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?_='+ Date.now();
    const params = {
        req: {
            module: "vkey.GetVkeyServer",
            method: "CgiGetVkey",
            param: {
                guid: "6202779200",
                songmid: ids,
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

    const {code,req} = (await axios.post(url, params)).data;
    const urls = [];
    if (code === ERR_OK) {
        const { midurlinfo, sip } = req.data;
        midurlinfo.forEach( data => {
           urls.push(data.purl ? sip[0] + data.purl : '')
        })
    }
    return {urls,req};
};


exports.filterSinger = (singer) => {
    const ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach( s => {
        ret.push(s.name)
    });
    return ret.join('/')
};



