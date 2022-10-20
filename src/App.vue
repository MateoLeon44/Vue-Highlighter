<!-- 
  Changes made to this file will not affect your tests.
  This file is used to control the behavior of the web preview. 
-->
<template>
  <div id="vue-app">
    <Highlighter />
  </div>
</template>

<script>
import Highlighter from './components/Highlighter.vue'

export default {
  name: 'vue-app',
  components: {
    Highlighter
  }
}
</script>

<style>
#vue-app {
  font-family: arial;
}
</style>