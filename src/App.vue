<template>
  <div class="app">
    <div class="header">
      <header-bar></header-bar>
    </div>
    <div class="page">
      <router-view></router-view>
    </div>
    <div class="footer">
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/Header/'
import FooterBar from '@/components/Footer/'
export default {
  components: {
    HeaderBar,
    FooterBar
  },
  name: 'app',
  mounted () {
    document.title = 'MyEnchantedTrader vMM.YYYY'
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

@import './assets/styles/App.scss';
</style>
