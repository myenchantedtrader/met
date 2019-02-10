<template>
  <div v-if="marketId !== null">
    <b-container fluid>
      <b-row>
        <b-col style="margin: 5px;">
          <h6>Buy</h6>
          <b-form-group id="exampleInputGroup1" horizontal label="Price:" label-size="sm" label-for="exampleInput1">
            <b-form-input id="exampleInput1" type="text" size="sm" required placeholder="0.00000000" style="text-align: right;"></b-form-input>
            <b-form-text>Lorem ipsum dolor sit amet</b-form-text>
          </b-form-group>
          <b-form-group id="exampleInputGroup2" horizontal label="Quantity:" label-size="sm" label-for="exampleInput2">
            <b-form-input id="exampleInput2" type="text" required size="sm" placeholder="0.00000000" style="text-align: right;"></b-form-input>
            <b-form-text>Lorem ipsum dolor sit amet</b-form-text>
          </b-form-group>
          <b-form-group id="exampleInputGroup2" horizontal label="Total:" label-size="sm" label-for="exampleInput2">
            <b-form-input id="exampleInput2" type="text" readonly size="sm" placeholder="0.00000000" style="text-align: right;"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col style="margin: 5px;">
          <h6>Sell</h6>
          <b-form-group id="exampleInputGroup1" horizontal label="Price:" label-size="sm" label-for="exampleInput1">
            <b-form-input id="exampleInput1" type="text" size="sm" required placeholder="0.00000000" style="text-align: right;"></b-form-input>
            <b-form-text>Lorem ipsum dolor sit amet</b-form-text>
          </b-form-group>
          <b-form-group id="exampleInputGroup2" horizontal label="Quantity:" label-size="sm" label-for="exampleInput2">
            <b-form-input id="exampleInput2" type="text" required size="sm" placeholder="0.00000000" style="text-align: right;"></b-form-input>
            <b-form-text>Lorem ipsum dolor sit amet</b-form-text>
          </b-form-group>
          <b-form-group id="exampleInputGroup2" horizontal label="Total:" label-size="sm" label-for="exampleInput2">
            <b-form-input id="exampleInput2" type="text" readonly size="sm" placeholder="0.00000000" style="text-align: right;"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" variant="success">Buy</b-button>
        </b-col>
        <b-col>
          <b-button type="submit" variant="danger">Sell</b-button>
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
        marketId: null
      }
    },
    mounted () {

    },
    computed: {
      ...mapGetters([
        'marketsList',
        'marketId'
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
</style>
