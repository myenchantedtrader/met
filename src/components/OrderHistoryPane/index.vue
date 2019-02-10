<template>
  <div v-if="marketId !== null" style="border-left: 1px solid #fff; border-bottom: 1px solid #fff; padding: 0 5px; margin-left: 10px;">
    <div class="scroll-container">
    	<div class="scroll-block">
        <div v-for="item, key in orders" :key="key" style="font-size: 12px;" v-bind:class="{ green: item[3] === 1, red: item[3] === 0 }">
          <span v-b-tooltip.hover :title="item[4]">⌚</span> {{item[0]}} | {{item[1]}} | {{item[2]}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        ws: null,
        orders: [],
        marketId: null
      }
    },
    mounted () {
      // this.$store.watch((state) => state.markets.marketId, (newValue, oldValue) => {
      //   if (oldValue === null) {
      //     this.initOrderHistory()
      //     return
      //   }

      //   if (this.ws instanceof WebSocket) {
      //     this.ws.close()
      //   }

      //   this.orders = []
      //   this.initOrderHistory()
      // })

      // this.initOrderHistory()
    },
    computed: {
      ...mapGetters([
        'marketsList',
        'marketId'
      ])
    },
    methods: {
      ...mapActions([

      ]) // ,
      // initOrderHistory () {
      //   if (!this.$parent.$api || this.marketId === null) {
      //     return false
      //   }

      //   this.ws = this.$parent.$api.ws.trades(this.marketsList[this.marketId]['name'], (response) => {
      //     const date = new Date(response['timestamp'])
      //     response['price'] = response['price']
      //     response['quantity'] = parseFloat(response['quantity'])
      //     response['amount'] = parseFloat(response['amount']).toFixed(2)
      //     response['timestamp'] = `${date.getFullYear()}-${[0, date.getMonth() + 1].join('').substr(-2)}-${[0, date.getDate()].join('').substr(-2)} ${[0, date.getHours()].join('').substr(-2)}:${[0, date.getMinutes()].join('').substr(-2)}:${[0, date.getSeconds()].join('').substr(-2)}`

      //     this.orders.unshift([...Object.values(response)])

      //     if (this.orders.length > 100) {
      //       this.orders.pop()
      //     }
      //   })
      // }
    }
  }
</script>

<style lang="scss">
@import './index.scss';
</style>
