<template>
  <div class="market-page-grid">
    <div class="market-pane" v-bind:class="{hide: !showMarketPane}">
      <market-pane></market-pane>
    </div>
    <!-- <div class="market-pane-switcher" @click="showMarketPane = !showMarketPane">{{ showMarketPane ? '<' : '>' }}</div> -->
    <div class="prices-pane">
      <prices-pane></prices-pane>
    </div>
    <div class="order-history-pane">
      <order-history-pane></order-history-pane>
    </div>
    <div class="chart-pane">
      <chart-pane></chart-pane>
    </div>
    <div class="buy-sell-pane">
      <buy-sell-pane></buy-sell-pane>
    </div>
    <div class="order-book-pane">
      <order-book-pane></order-book-pane>
    </div>
  </div>
</template>

<script>
  // import * as exchangesApi from '@/api/exchanges'
  import MarketPane from '@/components/MarketPane/'
  import ChartPane from '@/components/ChartPane/'
  import PricesPane from '@/components/PricesPane/'
  import OrderHistoryPane from '@/components/OrderHistoryPane/'
  import BuySellPane from '@/components/BuySellPane/'
  import OrderBookPane from '@/components/OrderBookPane/'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      MarketPane,
      ChartPane,
      PricesPane,
      OrderHistoryPane,
      BuySellPane,
      OrderBookPane
    },
    data () {
      return {
        showMarketPane: true,
        showChart: true,
        $api: null
      }
    },
    mounted () {
      // if (this.countConnectedExchanges === 0) {
      //   this.$router.push({name: 'home'})
      // }

      // this.$store.watch((state) => state.exchanges.exchangeId, (newValue, oldValue) => {
      //   this.$api = exchangesApi[this.exchangesList[newValue]['object']] || null
      // })
      // console.log(exchangesApi)
    },
    computed: {
      ...mapGetters([
        'exchanges/list',
        // 'countConnectedExchanges',
        'exchanges/id',
        'markets/id'
      ])
    },
    methods: {
      ...mapActions([

      ])
    }
  }
</script>

<style lang="scss">
@import './index.scss';
.app .page {
  padding: 0;
}

.market-page-grid {
  display: grid;
  // grid-template-columns: 202px 70%;
  // grid-template-columns:
  // 202px
  // calc((100% - 202px) / 4)
  // calc((100% - 202px) / 4)
  // calc((100% - 202px) / 4)
  // calc((100% - 202px) / 10)
  // calc(((100% - 202px) / 4) - ((100% - 202px) / 10));
  grid-template-columns:
    202px auto auto auto auto 210px;
  grid-template-rows: 105px auto 300px;
  grid-template-areas:
    "markets prices prices prices prices history"
    "markets chart chart chart chart history"
    "markets buy-sell buy-sell order-book order-book order-book";

  .market-pane {
    grid-area: markets;
  }

  .prices-pane {
    grid-area: prices;
    padding: 5px;
  }

  .order-history-pane {
    grid-area: history;
  }

  .chart-pane {
    grid-area: chart;
  }

  .buy-sell-pane {
    grid-area: buy-sell;
  }

  .order-book-pane {
    grid-area: order-book;
  }
}

.market-pane {
  position: relative;
  overflow-x: hidden;
  width: 202px;
  transition: width .2s linear;

  &.hide {
    width: 0px;
    transition: width .2s linear;

    li.exchanges-list-item {
      // display: none;
    }
  }

  .market-pane-switcher {
    position: absolute;
    left: 202px;
    top: 26px;
    cursor: pointer;
  }
}

</style>
