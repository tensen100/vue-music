import { getLyric } from './../../api/song'
import { ERR_OK } from '../../api/config';
import { Base64 } from 'js-base64'

/*function filterSinger(singer) {
    const ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach( s => {
        ret.push(s.name)
    });
    return ret.join('/')
}*/

class Song{
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url
    }
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise( (resolve, rejet) =>  {
            getLyric(this.mid).then( res => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric);
                    resolve(this.lyric)
                } else {
                    rejet('no lyric')
                }
            });
        })
    }
}

export function createSong(musicData) {
    return new Song(musicData)
}
