<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue';
// import PostCard from './components/PostCard.vue';
</script>


<template>
  <div id="app">
    <Navbar id="app-navbar" />
    <router-view class="router-view" />
  </div>
</template>

<script>
// import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  }
};
</script>

<style>
.router-view {
  margin: 70px auto 20px;
  max-width: 1200px;
}

#app {
  position: relative;
}

#app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
