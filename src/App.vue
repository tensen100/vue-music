<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
    import MHeader from '@/components/m-header.vue';
    import Tab from '@/components/tab.vue';
    import Player from "./components/player";
    export default {
        name: 'home',
        components: {
            Player,
            MHeader,
            Tab
        }
    }
</script>
