import storage from 'good-storage'

const PLAY_KEY = '__play__';
const PLAY_MAX_LEN = 200;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_MAX_LEN = 200;

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LEN = 15;

/**
 * 插入数组
 * @param arr 被插入的数组
 * @param val 插入的值
 * @param compare 过滤函数
 * @param maxLen 最大长度
 */
const insertArray = (arr, val, compare, maxLen) => {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val);
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
};

/**
 * 从数组中删除
 * @param arr
 * @param compare
 */
const deleteFromArray = (arr, compare) => {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1)
    }
};

// 播放记录
export const savePlay = (song) => {
    let songs = storage.get(PLAY_KEY, []);
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, PLAY_MAX_LEN);
    storage.set(PLAY_KEY, songs);
    return songs
};
export const loadPlay = () => {
    return storage.get(PLAY_KEY, [])
};

// 搜索记录
export const saveSearch = (query) => {
    let searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LEN);
    storage.set(SEARCH_KEY, searches);
    return searches
};
export const deleteSearch = (query) => {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query
    });
    storage.set(SEARCH_KEY, searches);
    return searches
};
export const clearSearch = () => {
    storage.remove(SEARCH_KEY);
    return []
};
export const loadSearch = () => {
    return storage.get(SEARCH_KEY, [])
};


// 喜欢的歌
export const saveFavorite = (song) => {
    let songs = storage.get(FAVORITE_KEY, []);
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, FAVORITE_MAX_LEN);
    storage.set(FAVORITE_KEY, songs);
    return songs
};
export const deleteFavorite = (song) => {
    let songs = storage.get(FAVORITE_KEY, []);
    deleteFromArray(songs, (item) => {
        return item.id === song.id
    });
    storage.set(FAVORITE_KEY, songs);
    return songs
};
export const loadFavorite = () => {
    return storage.get(FAVORITE_KEY, [])
};