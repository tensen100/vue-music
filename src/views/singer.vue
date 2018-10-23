<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
    import ListView from '../base/listview'
    import { createSinger } from '../assets/js/singer'
    import { getSingerList } from '../api/singer'
    import { ERR_OK } from '../api/config'
    import { mapMutations } from 'vuex'
    import * as types from '../store/mutation-types'
    const HOT_SINGER_LEN = 10; // 定义热门数据数量为10条
    const HOT_NAME = '热门';

    export default {
        data() {
            return {
                singers: []
            }
        },
        created() {
            this._getSingerList()
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.singer.style.bottom = bottom;
                this.$refs.list.refresh()
            },
            selectSinger(singer) {
                this.setSinger(singer);
                this.$router.push({
                    path: `/singer/${singer.id}`
                });

            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSinger(res.data.list)
                    }
                })
            },

            /**
             * 规范化歌手数据
             * @param list
             * @returns {*[]}
             * @private
             */
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                list.forEach((item, index) => {
                    if (index < HOT_SINGER_LEN) {
                        map.hot.items.push(createSinger({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }
                    const key = item.Findex;
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(createSinger({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                    }))
                });
                // 为了得到有序列表，我们需要处理 map
                let ret = [];
                let hot = [];
                for (let key in map) {
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if (val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                });
                return hot.concat(ret)
            },
            ...mapMutations({
                setSinger: types.SET_SINGER
            })
        },
        components: {
            ListView
        }
    }
</script>

<style scoped lang="less" >
  .singer{
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>
