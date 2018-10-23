<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from '../components/music-list';
    import { mapGetters } from 'vuex'
    import { ERR_OK } from '../api/config';
    import { getSongList } from "../api/recommend";
    import { createSong } from '../assets/js/song';

    export default {
        computed: {
            title() {
                return this.disc.disname
            },
            bgImage() {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        data() {
            return {
                songs: []
            }
        },
        created() {
            this._getSongList()
        },
        methods: {
            _getSongList() {
                if (!this.disc.dissid) {
                    return this.$router.push('/recommend')
                }
                getSongList(this.disc.dissid).then( res => {
                    if (res.code === ERR_OK) {
                        this.songs = res.list.map( song => createSong(song))
                    }
                })
            }
        },
        components: {MusicList}
    }
</script>

<style scoped lang="less">
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>