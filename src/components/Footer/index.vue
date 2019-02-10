<template>
  <div class="copyright">
    <b-container fluid>
      <b-row>
        <b-col md="6">
          <p>© 2018 - All Rights Reserved</p>
        </b-col>
        <b-col md="6">
          <ul class="bottom_ul">
            <li><a href="https://github.com/myenchantedtrader" target="_blank">GitHub</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </b-col>
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

    ])
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
