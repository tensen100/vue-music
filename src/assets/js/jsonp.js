import originJSONP from 'jsonp';

export default function jsonp(url, data, option) {
    url += (~url.indexOf('?') ? '&': '?') + param(data);
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if(!err) {
                resolve(data)
            }else {
                reject(err)
            }
        })
    })
}

function param(data) {
    const url  = [];
    for (const k in data) {
        if (data.hasOwnProperty(k)){
            const value = data[k] !== undefined ? data[k] : '';
            url.push(`${k}=${encodeURIComponent(value)}`)
        }
    }
    return url.join('&');
}