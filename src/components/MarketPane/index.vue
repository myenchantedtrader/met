<template>
  <b-modal centered lazy id="marketPane" ref="marketPane" size="lg" hide-title hide-footer>
    <div class="exchangesList__block" v-show="showExchanges">
      <div v-for="value, key in this['exchanges/list']" :key="key" :data-id="key" class="exchangesList__row" @click="clickExchange">
        <div class="exchangesList__title">{{value.name}}</div>
      </div>
    </div>
    <div class="marketsList__block" v-show="showMarkets">
      <a href="#">back</a>
      <div v-for="value, key in markets" :key="key" :data-id="key" class="marketsList__row" @click="clickMarket">
        <div class="marketsList__title">{{value.name}}</div>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import * as exchanges from '@/api/exchanges'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        showExchanges: true,
        showMarkets: false,
        markets: {}
      }
    },
    mounted () {
      // this.showMarkets(this.exchangeId)
      this.$refs.marketPane.show()
      // console.log(this.$api)
    },
    computed: {
      ...mapGetters([
        'exchanges/list',
        'exchanges/id',
        'markets/list',
        'markets/id',
        'markets/getByKey'
      ])
    },
    methods: {
      ...mapActions([
        'exchanges/setId',
        'markets/setId',
        'markets/save'
      ]),
      // async showMarkets (id) {
      //   this.setExchangeId(id)

      //   await this.getMarkets(id)
      // }
      async clickExchange (event) {
        const id = event.target.dataset.id
        // console.log(id, this['exchanges/setId'](id))
        this['exchanges/setId'](id)

        if (typeof exchanges[id] === 'object') {
          this.$api = exchanges[id]
        }

        const list = await this.$api.getMarkets()

        this['markets/save']({id: id, list: list})

        this.markets = this['markets/getByKey'](id)
        this.showExchanges = false
        this.showMarkets = true

        return true
      },
      clickMarket (event) {
        return true
      }
    }
  }
</script>

<style lang="scss">
@import './index.scss';

.exchangesList__block {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: space-between;
  flex-direction: row
}
.exchangesList__row {
  border: 1px solid #282828;
  border-radius: 4px;
  padding: 10px 20px;
  margin: auto;
  height: 250px;
  cursor: pointer;
}
.exchangesList__title {
  text-align: center;
  font-size: 16px;
}
</style>
