<template>
    <scroll @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :data="data"
            class="listview"
            ref="listview">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup" :key="group.id">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.id">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="list-shortcut"
             @touchstart.stop.prevent="onShortcutTouchStart"
             @touchmove.stop.prevent="onShortcutTouchMove"
             @touchend.stop>
            <ul>
                <li v-for="(item, index) in shortcutList"
                    class="item"
                    :key="item.id"
                    :data-index="index"
                    :class="{'current':currentIndex===index}">{{item}}
                </li>
            </ul>
        </div>

        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>

        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>

<script>
    import Scroll from './scroll'
    import Loading from './loading'

    import { getData } from '../assets/js/dom'
    const TITLE_HEIGHT = 30;
    const ANCHOR_HEIGHT = 18; // 每个元素的高度
    export default {
        props: {
            data: {
                type: Array,
                default: new Array(0)
            }
        },
        computed: {
            /**
             * 快速入口列表
             * @returns {*}
             */
            shortcutList() {
                return this.data.map((group) => {
                    return group.title.substr(0, 1)
                })
            },
            /**
             * 固定title
             * @returns {string}
             */
            fixedTitle() {
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        data() {
            return {
                scrollY: -1, // scroll的滚动实时位置
                currentIndex: 0, // 当前显示的位置
                diff: -1 // 固定title
            }
        },
        created() {
            /**
             * 这里初始化一些不需要监听变化的值
             */
            this.probeType = 3;
            this.listenScroll = true; // 是否监听滚动事件
            this.touch = {}; // 缓存触摸状态啊
            this.listHeight = [] // 保存每个group的高度
        },
        methods: {
            selectItem(item) {
                this.$emit('select', item)
            },

            /**
             * 快速入口触摸开始
             * @param e
             */
            onShortcutTouchStart(e) {
                let anchorIndex = getData(e.target, 'index') | 0;
                let firstTouch = e.touches[0];

                // 记录开始状态
                this.touch.y1 = firstTouch.pageY;
                this.touch.anchorIndex = anchorIndex;

                this._scrollTo(anchorIndex)
            },

            /**
             * 快速入口触摸移动
             * @param e
             */
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0];
                this.touch.y2 = firstTouch.pageY;
                // 计算移动的元素的个数 | 0 相当于parseInt
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
                let anchorIndex = this.touch.anchorIndex + delta;

                this._scrollTo(anchorIndex)
            },
            refresh() {
                this.$refs.listview.refresh()
            },
            // 接收scroll的滚动事件
            scroll(pos) {
                this.scrollY = pos.y
            },

            /**
             * 计算高度
             * @private
             */
            _calculateHeight() {
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    height += item.clientHeight;
                    this.listHeight.push(height)
                }
            },
            _scrollTo(index) {
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }
                this.scrollY = -this.listHeight[index];
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            }
        },
        watch: {
            data() {
                // data发生变化时延时计算高度
                setTimeout(() => {
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newY) {
                const listHeight = this.listHeight;
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                    return this.currentIndex = 0;
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop;
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        },
        components: {
            Scroll,
            Loading
        }
    }
</script>

<style lang="less">
    @import "../assets/less/variable";
    .listview{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: @color-background;
        .list-group{
            padding-bottom: 30px;
            .list-group-title{
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: @font-size-small;
                color: @color-text-l;
                background: @color-highlight-background;
            }
            .list-group-item{
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;
                .avatar{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .name{
                    margin-left: 20px;
                    color: @color-text-l;
                    font-size: @font-size-medium;
                }
            }
        }
        .list-shortcut{
            position: absolute;
            z-index: 30;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: @color-background-d;
            font-family: Helvetica;
            .item{
                padding: 3px;
                line-height: 1;
                color: @color-text-l;
                font-size: @font-size-small;
                &.current{
                    color: @color-theme;
                }
            }
        }
        .list-fixed{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            .fixed-title{
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: @font-size-small;
                color: @color-text-l;
                background: @color-highlight-background;
            }
        }
        .loading-container{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }

</style>