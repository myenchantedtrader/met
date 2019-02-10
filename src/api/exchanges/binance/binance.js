// Binance API
const API_URL = 'https://api.binance.com/'
const WS_URL = 'wss://stream.binance.com:9443'

function _call (url) {
  return new Promise((resolve, reject) => {
    fetch('https://cors-anywhere.herokuapp.com/' + API_URL + url)
      .then(r => r.json())
      .then(r => resolve(r))
      .catch(e => reject(e))
  })
}

const helpers = {
  alts: {
    'bcc': 'bch'
  },
  formatSymbols (symbols) {
    return symbols.map((value) => this.alts[value] || value)
  }
}

const rest = {
  async getSymbol (symbol) {
    const response = await _call('api/v1/exchangeInfo')

    return [response.symbols.find(value => value.symbol === symbol)].map((value) => [value.baseAsset, value.quoteAsset])[0]
  },
  async getMarkets () {
    const response = await _call('api/v1/exchangeInfo')

    // let finalList = []

    return response.symbols.map((value) => ({base: value.baseAsset, quote: value.quoteAsset}))
  },
  // ticker () {
  //   // return only tickers {ticker: {information}, ticker: {information}}
  // }
  async orderBook (symbol, limit = 100) {
    const response = await _call(`api/v1/depth?symbol=${symbol}&limit=${limit}`)

    let bid = {}
    response['bids'].forEach((value) => {
      bid[value[0]] = value[1]
    })

    let ask = {}
    response['asks'].forEach((value) => {
      ask[value[0]] = value[1]
    })

    return [bid, ask]
  }
}

// TODO: rewrite
const ws = {
  price (symbol, _cb) {
    const socket = new WebSocket(`${WS_URL}/ws/${symbol.toLowerCase()}@ticker`)

    socket.onmessage = (msg) => {
      try {
        const response = JSON.parse(msg.data)
        _cb(response.c)
      } catch (e) {
        console.log('Binance socket error', e)
      }
    }

    return socket
  },
  ticker (symbol, _cb) {
    const socket = new WebSocket(`${WS_URL}/ws/${symbol.toLowerCase()}@ticker`)

    socket.onmessage = (msg) => {
      try {
        const response = JSON.parse(msg.data)
        _cb({
          price: response.c,
          change: response.P,
          volume: response.q,
          high: response.h,
          low: response.l
        })
      } catch (e) {
        console.log('Binance socket error', e)
      }
    }

    return socket
  },
  trades (symbol, _cb) {
    const socket = new WebSocket(`${WS_URL}/ws/${symbol.toLowerCase()}@trade`)

    socket.onmessage = (msg) => {
      try {
        const response = JSON.parse(msg.data)
        _cb({
          price: response.p,
          quantity: response.q,
          amount: response.p * response.q,
          type: response.m ? 0 : 1,
          timestamp: response.T
        })
      } catch (e) {
        console.log('Binance socket error', e)
      }
    }

    return socket
  },
  async orderBook (symbol, _cb) {
    const book = await rest.orderBook(symbol)
    _cb(book[0], book[1])

    const socket = new WebSocket(`${WS_URL}/ws/${symbol.toLowerCase()}@depth`)

    socket.onmessage = (msg) => {
      try {
        const response = JSON.parse(msg.data)

        let bid = {}
        response['b'].forEach((value) => {
          bid[value[0]] = value[1]
        })

        let ask = {}
        response['a'].forEach((value) => {
          ask[value[0]] = value[1]
        })

        _cb(bid, ask)
      } catch (e) {
        console.log('Binance socket error', e)
      }
    }

    return socket
  }
}

export default {
  ...helpers,
  ...rest,
  ws
}
