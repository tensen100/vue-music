<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from "../components/music-list";
    import { getSingerDetail } from "../api/singer";
    import { ERR_OK } from "../api/config";
    import { createSong } from '../assets/js/song'
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'
            ])
        },
        data() {
            return{
                songs: []
            }
        },
        created() {
            this._getDetail();
        },
        methods: {
            _getDetail() {
                if (!this.singer.id) {
                    this.$router.push('./singer')
                }
                getSingerDetail(this.singer.id).then( res => {
                    if (res.code === ERR_OK) {
                        this.songs = res.list.map( song => createSong(song))
                    }
                })
            },
/*            _normalizeSongs(list) {
                const ret = [];
                list.forEach( item => {
                    const { musicData } = item;
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                });
                return ret
            }*/
        },
        components: {MusicList}
    }
</script>

<style lang="less">
    .slide-enter-active, .slide-leave-active{
        transition: all 0.3s;
    }
   .slide-enter, .slide-leave-to{
       transform: translate3d(100%, 0, 0);
   }
</style>