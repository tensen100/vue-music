<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
    import MusicList from '../components/music-list';
    import { mapGetters } from 'vuex'
    import { createSong } from '../assets/js/song';
    import { ERR_OK } from '../api/config';
    import { getMusicList } from '../api/rank';

    export default {
        computed: {
            title() {
                return this.topList.topTitle;
            },
            bgImage() {
                if (this.songs.length) {
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters(['topList'])
        },
        data() {
            return {
                songs: [],
                rank: true
            }
        },
        created() {
            this._getMusicList()
        },
        methods: {
            _getMusicList() {
                if (!this.topList.id) {
                    return this.$router.push('/rank')
                }
                getMusicList(this.topList.id).then( res => {
                    if (res.code === ERR_OK ) {
                        this.songs = res.list.map( song => createSong(song))
                    }
                })
            }
        },
        components: { MusicList }
    }
</script>

<style scoped lang="less">
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s ease;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>