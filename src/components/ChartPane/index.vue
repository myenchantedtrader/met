<template>
  <div style="width: 100%; height: 100%;">
    <div id="chart" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  // import tradingView from '@/api/tradingview'

  export default {
    data () {
      return {

      }
    },
    mounted () {
      // if (this.exchangeId !== null && this.marketId !== null) {
      //   this.initChart()
      // }
      // this.$store.watch((state) => state.markets.marketId, (newValue, oldValue) => {
      //   this.initChart()
      // })
    },
    computed: {
      ...mapGetters([
        'exchangesList',
        'marketsList',
        'exchangeId',
        'marketId'
      ])
    },
    methods: {
      ...mapActions([

      ]) // ,
      // initChart () {
      //   if (this.exchangeId === null || this.marketId === null) {
      //     return false
      //   }

      //   const exchangeName = this.exchangesList[this.exchangeId]['name'].toUpperCase()
      //   const marketName = this.marketsList[this.marketId]['name'].toUpperCase().replace(/[-_/]/g, '')

      //   tradingView.drawChart('chart', exchangeName, marketName)
      // }
    }
  }
</script>

<style lang="scss">
@import './index.scss';
</style>
