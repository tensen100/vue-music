import * as types from './mutation-types'

const mutations = {
    // 歌手
    [types.SET_SINGER]: (state, singer) =>{
        state.singer = singer
    },
    // 播放 暂停
    [types.SET_PLAYING_STATE]: (state, flag) =>{
        state.playing = flag
    },
    // 全屏
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    // 播放列表
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    // 顺序播放列表
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    // 播放模式
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    // 当前播放位置
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList
    },
    [types.SET_SEARCH_HISTORY](state, history) {
        state.searchHistory = history
    },
    [types.SET_PLAY_HISTORY](state, history) {
        state.playHistory = history
    },
    [types.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    }
};

export default mutations