import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from './config'
import { shuffle } from './util'

// 处理播放列表
export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
};

// 播放
export const playerMixin = {
    computed: {
        // 播放模式图标
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'playlist',
            'currentSong',
            'mode',
            'favoriteList'
        ])
    },
    methods: {
        // 切换播放模式
        changeMode() {
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = mode === playMode.random ? shuffle(this.sequenceList) : this.sequenceList ;
            this.resetCurrentIndex(list);
            this.setPlaylist(list)
        },
        // 重置当前播放歌曲索引
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            });
            this.setCurrentIndex(index)
        },
        // 标记|取消喜欢的歌曲
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList(song)
            }
        },
        getFavoriteIcon(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        // 是否时喜欢的歌曲
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            });
            return index > -1
        },
        ...mapMutations({
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayingState: 'SET_PLAYING_STATE'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    }
};

// 搜索
export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 120
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
    }
};