<template>
  <div class="page-home">
    <Header />

    <div class="img-container">
      <h2>image file</h2>

      <div class="img-item">
        <Logo width="60" />
        <p>svg</p>
      </div>

      <div class="img-item">
        <img
          src="@/assets/img/logo.png"
          style="width: 60px"
        />
        <p>png</p>
      </div>

      <h2>background image</h2>

      <div class="img-item">
        <div class="bg bg-svg" />
        <p>svg(vue)</p>
      </div>

      <div class="img-item">
        <div class="bg bg-png" />
        <p>png(vue)</p>
      </div>

      <div class="img-item">
        <div class="bg bg-svg-css" />
        <p>svg(css)</p>
      </div>

      <div class="img-item">
        <div class="bg bg-png-css" />
        <p>png(css)</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Header from '@/components/Header.vue'
  import Logo from '@/assets/img/logo.svg'

  export default {
    name: 'Home',

    components: {
      Header,
      Logo
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/css/_vars.scss';

  .page-home {
    text-align: center;

    h2 {
      font-size: $font-size;
    }

    .img-container {
      text-align: center;

      h2 {
        margin-top: 50px;
        padding: 20px;
      }

      .img-item {
        display: inline-block;
        width: 140px;
        vertical-align: middle;
      }

      .bg {
        width: 100px;
        height: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
        margin: 0 auto;

        &.bg-svg {
          background-image: url('~@/assets/img/logo.svg?inline');
        }

        &.bg-png {
          background-image: url('~@/assets/img/logo.png');
        }
      }
    }
  }
</style>
