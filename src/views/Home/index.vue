<template>
  <div class="home">
    <!-- <b-modal centered lazy id="modalStart" ref="modal" title="Connect exchange" @ok="checkExchangeData">
      <b-alert variant="danger" dismissible :show="form.modalStart.showAlert" @dismissed="form.modalStart.showAlert = false">{{form.modalStart.alertMessage}}</b-alert>
      <form @submit.stop.prevent="saveExchangeData">
        <b-form-input type="text" placeholder="Enter exchange api key" v-model="form.modalStart.apiKey"></b-form-input>
        <b-form-input type="text" placeholder="Enter exchange secret key" v-model="form.modalStart.secretKey"></b-form-input>
      </form>
    </b-modal> -->

    <b-container class="home-welcome">
      <b-row>
        <b-col>
          <h1 class="text-center text-uppercase">Welcome to My Enchanted Trader!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid class="home-top-volumes">
      <h2 class="text-uppercase text-center">Top volumes</h2>
      <div class="text-center">
        <b-badge variant="default" :class="{'badge-primary': topVolumes.selected === 'USD'}" @click="getTopVolumes('USD')" style="cursor: pointer;">USD</b-badge>
        <b-badge variant="default" :class="{'badge-primary': topVolumes.selected === 'BTC'}" @click="getTopVolumes('BTC')" style="cursor: pointer;">BTC</b-badge>
        <b-badge variant="default" :class="{'badge-primary': topVolumes.selected === 'ETH'}" @click="getTopVolumes('ETH')" style="cursor: pointer;">ETH</b-badge>
      </div>
      <b-row>
        <b-col md="2" v-for="item, key in topVolumes[topVolumes.selected]" :key="key">
          <div class="home-top-volumes-item">
            <div class="header">{{item[0]}}</div>
            <div class="text">{{item[1] | formatNumber}} {{topVolumes.selected}}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid class="addExchange__block">
      <h2 class="addExchange__title">Add exchanges</h2>
      <b-alert variant="danger" dismissible :show="form.addKey.showAlert" @dismissed="form.AddKey.showAlert = false">{{form.addKey.alertMessage}}</b-alert>
      <b-alert variant="danger" dismissible :show="form.addKey.showAlert" @dismissed="form.AddKey.showAlert = false">{{form.addKey.alertMessage}}</b-alert>
      <div class="addExchange__form">
        <b-form inline @submit="addExchangeSubmit">
          <!-- <b-form-group label="Select exchanges:"> -->
            <b-form-select required v-model="form.addKey.exchange" :options="getOptions()">
              <!-- <template slot="first"> -->
                <option slot="first"  :value="null" disabled selected>Please select an exchanges</option>
              <!-- </template> -->
            </b-form-select>
          <!-- </b-form-group> -->
          <!-- <b-form-group label="Label:"> -->
            <b-form-input required type="text" placeholder="Enter label" v-model="form.addKey.label"></b-form-input>
          <!-- </b-form-group> -->
          <!-- <b-form-group label="API key:"> -->
            <b-form-input required type="text" placeholder="Enter api key" v-model="form.addKey.api"></b-form-input>
          <!-- </b-form-group> -->
          <!-- <b-form-group label="Secret key:"> -->
            <b-form-input required type="text" placeholder="Enter secret key" v-model="form.addKey.secret"></b-form-input>
          <!-- </b-form-group> -->
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </div>
    </b-container>

    <b-container fluid class="home-top-volumes">
      <h2 class="text-uppercase text-center">Latest news</h2>
      <b-row>
        <div v-for="val, key in newsList" :key="key">
            <a class="header" :href="val.url" target="_blank">{{val.title}}</a>
            <div class="text">{{val.body}}</div>
        </div>
      </b-row>
    </b-container>

    <!-- <b-container fluid class="home-exchanges-board">
      <b-row>
        <b-col v-for="item, key in exchangesList" :key="key" v-if="item.work" md="4" class="m-0 p-0">
          <div class="home-exchanges-board-item">
            <div class="header">{{item.name}}</div>
            <div class="text">{{item.desc}}</div>
            <div class="bottom"><b-btn v-b-modal.modalStart variant="success" @click="setCurrentId(key)" :disabled="isExchangeConnected(key)">{{isExchangeConnected(key) ? 'Connected' : 'Connect'}}</b-btn></div>
          </div>
        </b-col>
      </b-row>
    </b-container> -->
  </div>
</template>

<script>
  import coincompare from '@/api/coincompare'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        exchangesList: {},
        form: {
          modalStart: {
            id: null,
            apiKey: '',
            secretKey: '',
            showAlert: false,
            alertMessage: ''
          },
          addKey: {
            exchange: null,
            label: '',
            api: '',
            secret: '',
            alertMessage: '',
            showAlert: false
          }
        },
        topVolumes: {
          selected: 'USD',
          USD: {},
          BTC: {},
          ETH: {}
        },
        newsList: {}
      }
    },
    mounted () {
      this.getTopVolumes(this.topVolumes.selected)
      this.getLatestNews()
    },
    filters: {
      formatNumber (value) {
        return parseInt(value).toLocaleString()
      }
    },
    computed: {
      ...mapGetters([
        'exchanges/list',
        'keys/getById'
      ])
    },
    methods: {
      ...mapActions([
        'keys/save'
      ]),
      async getTopVolumes (symbol) {
        coincompare.getTopVolume(symbol, 12) // TODO: add limit to config (6, 12, 18...)
          .then((response) => response.Data)
          .then((data) => {
            this.topVolumes.selected = symbol
            this.topVolumes[symbol.toUpperCase()] = Object.values(data).map((value) => [value.NAME, value.VOLUME24HOURTO.toFixed(0)])
          })
      },
      async getLatestNews () { // TODO: add show / hide to settings
        coincompare.getLatestNews()
          .then((response) => response.Data)
          .then((data) => {
            this.newsList = Object.values(data).map((value) => ({key: value.id, url: value.url, title: value.title, body: value.body})).slice(0, 10)
          })
      },
      getOptions () {
        return [...Object.values(this['exchanges/list']).map((value, key) => {
          return {
            value: value.key,
            text: value.name
          }
        }
        )]
      },
      addExchangeSubmit (event) {
        event.preventDefault()

        this['keys/save']({id: this.form.addKey.exchange, label: this.form.addKey.label, api: this.form.addKey.api, secret: this.form.addKey.secret})

        this.form.addKey = {exchange: null, api: '', secret: '', showAlert: false, alertMessage: '', label: ''}
      }
    }
  }
</script>

<style lang="scss">
@import './index.scss';
</style>
