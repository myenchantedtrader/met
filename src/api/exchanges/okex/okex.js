// OKEx API
// const ApiUrl = 'https://api.binance.com/'
const WsUrl = 'wss://real.okex.com:10441/websocket'

// function _call (url) {
//   return new Promise((resolve, reject) => {
//     fetch('https://cors-anywhere.herokuapp.com/' + ApiUrl + url)
//       .then(r => r.json())
//       .then(r => resolve(r))
//       .catch(e => reject(e))
//   })
// }

export default {
  async getSymbol (symbol) {
    // const response = await _call('/api/v1/exchangeInfo')

    // return [response.symbols.find(value => value.symbol === symbol)].map((value) => [value.baseAsset, value.quoteAsset])[0]
  },
  ws: {
    price (symbols, _cb) {
      const socket = new WebSocket(WsUrl)
      const channel = 'ok_sub_spot_' + symbols[0].toLowerCase() + '_' + symbols[1].toLowerCase() + '_ticker'

      // "{'event':'addChannel','channel':'ok_sub_spot_" + symbols[0].toLowerCase() + '_' + symbols[1].toLowerCase() + "_ticker'}"
      socket.onopen = function () {
        socket.send("{'event':'addChannel','channel':'" + channel + "'}")
      }

      socket.onmessage = (msg) => {
        try {
          const response = JSON.parse(msg.data)
          if (response[0]['channel'] === channel) {
            _cb(response[0]['data']['last'])
          }
        } catch (e) {
          console.log('OKEx socket error', e)
        }
      }

      return socket
    },
    ticker (symbol, _cb) {
      // const socket = new WebSocket(`${WsUrl}/ws/${symbol.toLowerCase()}@ticker`)
      //
      // socket.onmessage = (msg) => {
      //   try {
      //     const response = JSON.parse(msg.data)
      //     _cb({
      //       price: response.c,
      //       change: response.P,
      //       volume: response.q,
      //       high: response.h,
      //       low: response.l
      //     })
      //   } catch (e) {
      //     console.log('Binance socket error: ' + e.message)
      //   }
      // }
      //
      // return socket
    }
  }
}
