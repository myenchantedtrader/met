// Bittrex API via Coinigy
// import socketCluster from 'socketcluster-client'

const ApiUrl = 'https://bittrex.com/api/'
const ApiVer = 'v2.0'

// const coinigyKey = '0ae7b8d3c3e9050a1d7ff6a49517ae28'
// const coinigySecret = '83b5e0c0116b621f26a7bb66715b0ee6'

function _call (url) {
  return new Promise((resolve, reject) => {
    fetch('https://cors-anywhere.herokuapp.com/' + url) // Bittrex is not using cors headers
      .then(r => r.json())
      .then(r => resolve(r))
      .catch(e => reject(e))
  })
}

export default {
  // getMarketSummary (market = null) {
  //   const url = ApiUrl + ApiVer + "/pub/market/GetMarketSummary" + (market ? "?marketName=" + market : "")
  // },

  async GetMarketSummaries () {
    const url = ApiUrl + ApiVer + '/pub/markets/GetMarketSummaries'
    try {
      const result = await _call(url)
      return result
    } catch (e) {
      return false
    }
  },

  testWs () {
    /* const SCsocket = socketCluster.connect({hostname: 'sc-02.coinigy.com', port: '443', secure: 'true'})
    SCsocket.on('connect', function (status) {
      SCsocket.on('error', function (err) {
        console.log(err)
      })

      SCsocket.on('auth', {apiKey: coinigyKey, apiSecret: coinigySecret}, function (err, token) {
        console.log(err, token)
        if (!err && token) {
          // var scChannel = SCsocket.subscribe('TICKER')
          // console.log(scChannel)
          // scChannel.watch(function (data) {
          //   console.log(data)
          // })

          const scChannel = SCsocket.subscribe('WSTRADE-BTRX--ETH--BTC')
          scChannel.watch(function (data) {
            // log output as new messages stream in
            console.log(data.time_local + ' ' + data.price + ' ' + data.quantity + ' ' + data.type)
          })

          // Optional: Get a list of all Bittrex (BTRX) channels.
          SCsocket.emit('channels', 'BTRX', function (err, data) {
            if (!err) {
              console.log(data)
            } else {
              console.log(err)
            }
          })
        } else {
          console.log(err)
        }
      })
    }) */
  }
}
