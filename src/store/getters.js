// 歌手
export const singer = state => state.singer;

// 播放/暂停状态
export const playing = state => state.playing;

// 全屏/迷离
export const fullScreen = state => state.fullScreen;

// 播放列表
export const playlist = state => state.playlist;

// 歌曲列表
export const sequenceList = state => state.sequenceList;

// 播放模式
export const mode = state => state.mode;

// 当前歌曲索引
export const currentIndex = state => state.currentIndex;

// 当前歌曲
export const currentSong = (state) => state.playlist[state.currentIndex] || {};

export const disc = state => state.disc;

export const topList = state => state.topList;

export const searchHistory = state => state.searchHistory;

export const playHistory = state => state.playHistory;

export const favoriteList = state => state.favoriteList;
