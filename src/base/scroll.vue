<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            // 是否监听滚动事件
            listenScroll: {
                type: Boolean,
                default: false
            },
            // 数据更新时刷新页面用
            data: {
                type: Array,
                default: null
            },
            pullUp: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                });

                // 如果监听滚动事件，将滚动事件派发
                if (this.listenScroll){
                    const me = this;
                    this.scroll.on('scroll', pos => {
                        me.$emit('scroll',pos)
                    })
                }


                if(this.pullUp) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollX + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }

                if(this.beforeScroll) {
                    this.scroll.on('beforeScrollStart',  () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            // 禁用
            disable(){
                this.scroll && this.scroll.disable()
            },
            // 启用
            enable() {
                this.scroll &&  this.scroll.enable();
            },
            // 刷新
            refresh() {
                this.scroll && this.scroll.refresh();
            },

            /**
             * 滚动到指定位置
             */
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },

            /**
             * 滚动到指定元素
             */
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>