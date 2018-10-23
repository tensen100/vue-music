<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="item">{{index}}</span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { addClass } from '../assets/js/dom';

    export default {
        props: {
            loop: {
                type: Boolean,
                default: true,
            },
            autoPlay: {
                type: Boolean,
                default: false,
            },
            interval: {
                type: Number,
                default: 4000
            },
            threshold: {
                type: Number,
                default: 0.3
            },
            speed: {
                type: Number,
                default: 400
            },
            showDot: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted() {
            this.update();
            window.addEventListener('resize', () => {
                if (!this.slider || !this.slider.enabled) {
                    return
                }
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    if (this.slider.isInTransition){
                        this._onScrollEnd();
                    } else {
                        if (this.autoPlay) {
                            this._play()
                        }
                    }
                    this.refresh()
                }, 60);
                // this._setSliderWidth(true);
                // this.slider.refresh()
            })
        },
        destroyed(){
            clearTimeout(this.timer)
        },
        methods: {
            update() {
                if( this.slider) {
                    this.slider.destory()
                }
                this.$nextTick( () => {
                    this.init()
                })
            },
            refresh() {
                this._setSliderWidth(true);
                this.slider.refresh();
            },
            prev() {
                this.slider.prev()
            },
            next() {
                this.slider.next()
            },
            init() {
                clearTimeout(this.timer);
                this.currentPageIndex = 0;
                this._setSliderWidth();
                if (this.showDot) {
                    this._initDots();
                }
                this._initSlider();
                if (this.autoPlay){
                    this._play();
                }
            },
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;

                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');
                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: this.threshold,
                        speed: this.speed
                    },
                    bounce: false,
                    stopPropagation: true,
                    click: this.click
                });

                this.slider.on('scrollEnd', this._onScrollEnd);
                this.slider.on('touchEnd', () => {
                    if (this.autoPlay) {
                        this._play();
                    }
                });

                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            _onScrollEnd() {
                this.currentPageIndex = this.slider.getCurrentPage().pageX;
                if (this.autoPlay){
                    this._play()
                }
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },

            _play() {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.slider.next()
                }, this.interval)
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/less/variable";
    .slider{
        min-height: 1px;
        .slider-group{
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item{
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                a{
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
        .dots{
            position: absolute;
            right: 0;
            left: 0;
            bottom: 12px;
            text-align: center;
            font-size: 0;
            .dot{
                display: inline-block;
                margin: 0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: @color-text-l;
                transition: width 0.3s;
                &.active {
                    width: 20px;
                    border-radius: 5px;
                    background: @color-text-ll;
                }
            }
        }
    }

</style>