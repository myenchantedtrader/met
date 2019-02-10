<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="3">
          <div v-if="Object.values(marketInfo).length > 0" style="padding: 3px 5px;">
            <!-- <div style="text-align: center;"><span style="color: #282828; font-size: 14px;">{{exchangesList[exchangeId]['name'].toUpperCase()}}</span></div> -->
            <div style="line-height: 13px;">
              <span style="color: #fff; font-size: 14px;">{{marketInfo.price}} <span v-bind:class="{ green: marketInfo.change > 0, red: marketInfo.change < 0 }" >({{marketInfo.change}} %)</span></span><br>
              <span style="color: #afafaf; font-size: 12px;">Volume: {{marketInfo.volume}}</span><br>
              <span style="color: #afafaf; font-size: 12px;">High: {{marketInfo.high}}</span><br>
              <span style="color: #afafaf; font-size: 12px;">Low: {{marketInfo.low}}</span>
            </div>
          </div>
        </b-col>
        <b-col md="3" v-if="Object.keys(prices).length > 0"  v-for="item, key in prices" :key="key">
          <div v-if="item.price > 0" style="padding: 3px 5px;">
            <div style="color: #fff; font-size: 14px; text-align: center;">{{item.price}}</div>
            <div style="color: #282828; font-size: 12px; text-align: center;">{{exchangesList[key]['name']}}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
  // import * as exchangesApi from '@/api/exchanges'
  // import coincompare from '@/api/coincompare'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        marketInfo: {},
        infoWs: null,
        prices: {}
      }
    },
    mounted () {
      // this.$store.watch((state) => state.markets.marketId, (newValue, oldValue) => {
      //   if (oldValue === null) {
      //     this.initMarketInfo()
      //     return
      //   }

      //   this.marketInfo = {}
      //   if (this.infoWs instanceof WebSocket) {
      //     this.infoWs.close()
      //   }

      //   Object.keys(this.prices).forEach((key) => {
      //     if (this.prices[key]['ws'] instanceof WebSocket) {
      //       this.prices[key]['ws'].close()
      //     }
      //   })

      //   this.prices = {}
      //   this.initMarketInfo()
      // })

      // this.initMarketInfo()
    },
    computed: {
      ...mapGetters([
        'exchangesList',
        'marketsList',
        'exchangeId',
        'marketId',
        'getExchangeIdByName'
      ])
    },
    methods: {
      ...mapActions([

      ]) // ,
      // initMarketInfo () {
      //   // console.log(this.$api.ws.ticker(this.marketsList[this.marketId]['name']))
      //   if (!this.$parent.$api || this.exchangeId === null || this.marketId === null) {
      //     return false
      //   }

      //   this.infoWs = this.$parent.$api.ws.ticker(this.marketsList[this.marketId]['name'], (res) => { this.marketInfo = res })

      //   this.pricesFromExchanges()
      // },
      // async pricesFromExchanges () {
      //   const symbols = await this.$parent.$api.getSymbol(this.marketsList[this.marketId]['name'])

      //   const exchanges = await coincompare.getExchangesBySymbol(...symbols)

      //   exchanges.forEach(async (value) => {
      //     const id = this.getExchangeIdByName(value)
      //     if (id === -1 || id === this.exchangeId) {
      //       return
      //     }

      //     if (typeof exchangesApi[this.exchangesList[id]['object']] === 'undefined') {
      //       return
      //     }

      //     this.prices[id] = {}

      //     this.prices[id]['ws'] = await exchangesApi[this.exchangesList[id]['object']].ws.price(symbols, (price) => { this.prices[id]['price'] = price })
      //   })
      // }
    }
  }
</script>

<style lang="scss">
@import './index.scss';
</style>
