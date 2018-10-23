import * as types from './mutation-types';
import { playMode } from '../assets/js/config';
import { shuffle } from '../assets/js/util';
import { clearSearch, deleteSearch, saveSearch, savePlay,  saveFavorite, deleteFavorite } from '../assets/js/cach';


/**
 * 查找歌曲在列表中的位置
 * @param list
 * @param song
 * @returns {number | *}
 * !!! 处理重复的方法
 */
function findIndex(list, song) {
    return list.findIndex( item => {
        return item.id === song.id
    })
}

/**
 * 选中播放
 * @param commit
 * @param state
 * @param list
 * @param index
 */
export const selectPlay = ({commit, state}, {list, index}) => {
    // 跟新播放列表
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.mode === playMode.random) {
        // 随机模式打乱顺序
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    // 当前歌曲索引
    commit(types.SET_CURRENT_INDEX, index);
    // 打开全屏
    commit(types.SET_FULL_SCREEN, true);
    // 设置播放状态
    commit(types.SET_PLAYING_STATE, true);
};

/**
 * 随机播放
 * @param commit
 * @param list
 */
export const randomPlay = ({commit}, {list}) => {
    // 设置随机播放模式
    commit(types.SET_PLAY_MODE, playMode.random);
    // 跟新播放列表
    commit(types.SET_SEQUENCE_LIST, list);
    // 乱序
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    //当前歌曲索引
    commit(types.SET_CURRENT_INDEX, 0);
    // 全屏
    commit(types.SET_FULL_SCREEN, true);
    // 播放状态
    commit(types.SET_PLAYING_STATE, true)
};

/**
 * 插入歌曲
 * @param commit
 * @param state
 * @param song
 */
export const insertSong = ({commit, state}, song) => {
    const playlist = state.playlist.slice();
    const sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;

    // 记录当前歌曲
    const currentSong = playlist[currentIndex];

    // 查找当前列表中是否有待插入的歌曲并返回其索引
    const fpIndex = findIndex(playlist, song);

    // 索引+1
    currentIndex ++;

    // 插入到当前位置
    playlist.splice(currentIndex, 0, song);

    // 如果已经包含了这首歌
    if (fpIndex > -1) {
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1);
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }

    const currentSIndex = findIndex(sequenceList, currentSong) + 1;
    const fsIndex = findIndex(sequenceList, song);
    sequenceList.splice(currentSIndex, 0, song);

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
};

/**
 * 保存搜索记录
 * @param commit
 * @param query
 */
export const saveSearchHistory = ({commit}, query) => {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
};

/**
 * 删除搜索记录
 * @param commit
 * @param query
 */
export const deleteSearchHistory = ({commit}, query) => {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
};

/**
 * 清空搜索记录
 * @param commit
 */
export const clearSearchHistory = ({commit}) => {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
};

/**
 * 删除歌曲
 * @param commit
 * @param state
 * @param song
 */
export const deleteSong = ({commit, state}, song) => {
    const playList = state.playlist.slice();
    const sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    const pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);
    const sIndex = findIndex(sequenceList, song);
    sequenceList.splice(sIndex, 1);
    if (currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex --
    }

    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);

    if (!playList.length) {
        commit( types.SET_PLAYING_STATE, false)
    } else {
        commit(types.SET_PLAYING_STATE, true)
    }
};

/**
 * 保存历史播放记录
 * @param commit
 * @param song
 */
export const savePlayHistory = ({commit}, song) => {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
};

/**
 * 保存喜欢
 * @param commit
 * @param song
 */
export const saveFavoriteList = ({commit}, song) => {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
};

/**
 * 删除喜欢
 * @param commit
 * @param song
 */
export const deleteFavoriteList = ({commit}, song) => {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
};