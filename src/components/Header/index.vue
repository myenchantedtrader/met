<template>
  <div class="main-menu">
    <b-container fluid>
      <b-row>
        <b-col md="6">
          <b-link to="/">Home</b-link>
          <b-link to="/market/">Market</b-link>
          <!-- <span v-if="typeof exchangesList[exchangeId] !== 'undefined'">{{exchangesList[exchangeId]['name']}}</span><span v-if="typeof marketsList[marketId] !== 'undefined'">-{{marketsList[marketId]['name']}}</span> -->
        </b-col>
        <!-- <b-col md="6" v-if="countConnectedExchanges > 0">
          <b-row>
            <b-col style="text-align: right;">
              <b-badge v-for="item, key in exchangesList" :key="key" v-show="isExchangeConnected(key)" variant="success" style="margin-right: 5px">{{item.name}}</b-badge>
            </b-col>

            <b-col><icon name="cog" color="#fff" label="Settings"></icon></b-col>
          </b-row>
        </b-col> -->
        <b-col md="6" class="text-right" style="color: #fff;">⚙</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'exchanges/list',
      'exchange/id',
      // 'isExchangeConnected',
      // 'countConnectedExchanges',
      'marketId',
      'marketsList'
    ])
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
