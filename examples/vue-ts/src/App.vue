<template>
  <router-view />
</template>

<script lang="ts">
  export default {
    name: 'App',

    methods: {
      handler () {
        console.log('123哈哈哈123')
      }
      // a () {
      //   let b
      // }
    }
  }
</script>
