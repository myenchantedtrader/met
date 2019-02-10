<template>
  <div v-if="marketId !== null">
    <b-container fluid>
      <b-row>
        <b-col style="padding: 0; margin: 0 5px;">
          <h6>Bids</h6>
          <div class="scroll-container">
            <div class="scroll-block">
              <ul class="order-book">
              	<li class="order-book-item">
                  <b-row no-gutters class="header">
                    <b-col cols="6" style="text-align: left;">Price</b-col>
                    <b-col cols="6" style="text-align: right;">BTC total</b-col>
                  </b-row>
                </li>
                <li class="order-book-item" v-for="item, key in bidSort" :key="key">
                  <b-row no-gutters>
                    <b-col cols="6" class="price">{{item}}</b-col>
                    <b-col cols="6" class="total">{{bid[item]}}</b-col>
                  </b-row>
                </li>
              </ul>
            </div>
          </div>
        </b-col>
        <b-col style="padding: 0; margin: 0 5px;">
          <h6 style="text-align: right;">Asks</h6>
          <div class="scroll-container">
          	<div class="scroll-block">
              <ul class="order-book">
                <li class="order-book-item">
                  <b-row no-gutters class="header">
                    <b-col cols="6" style="text-align: left;">Price</b-col>
                    <b-col cols="6" style="text-align: right;">BTC total</b-col>
                  </b-row>
                </li>
                <li class="order-book-item" v-for="item, key in askSort" :key="key">
                  <b-row no-gutters>
                    <b-col cols="6" class="price">{{item}}</b-col>
                    <b-col cols="6" class="total">{{ask[item]}}</b-col>
                  </b-row>
                </li>
              </ul>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        marketId: null,
        ws: null,
        bid: {},
        bidSort: [],
        ask: {},
        askSort: []
      }
    },
    mounted () {
      // this.$store.watch((state) => state.markets.marketId, (newValue, oldValue) => {
      //   if (oldValue === null) {
      //     this.initOrderBook()
      //     return
      //   }

      //   if (this.ws instanceof WebSocket) {
      //     this.ws.close()
      //   }

      //   this.bid = {}
      //   this.ask = {}
      //   this.bidSort = []
      //   this.askSort = []
      //   this.initOrderBook()
      // })

      // this.initOrderBook()
    },
    computed: {
      ...mapGetters([
        'marketsList'/* ,
        'marketId' */
      ])
    },
    methods: {
      ...mapActions([

      ]) // ,
      // initOrderBook () {
      //   if (!this.$parent.$api || this.marketId === null) {
      //     return false
      //   }

      //   this.ws = this.$parent.$api.ws.orderBook(this.marketsList[this.marketId]['name'], (bid, ask) => {
      //     Object.keys(bid).forEach((value) => {
      //       if (bid[value] === '0.00000000') {
      //         delete this.bid[value]
      //         return
      //       }

      //       this.bid[value] = bid[value]
      //     })

      //     this.bidSort = Object.keys(this.bid).sort().reverse().splice(0, 100)

      //     Object.keys(ask).forEach((value) => {
      //       if (ask[value] === '0.00000000') {
      //         delete this.ask[value]
      //         return
      //       }

      //       this.ask[value] = ask[value]
      //     })

      //     this.askSort = Object.keys(this.ask).sort().splice(0, 100)
      //   })
      // }
    }
  }
</script>

<style lang="scss">
@import './index.scss';
</style>
