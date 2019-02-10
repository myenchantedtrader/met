// Poloniex API
import autobahn from 'autobahn'

const ApiUrl = 'https://api.poloniex.com/'
const WsUrl = 'wss://api.poloniex.com'
const Ws2Url = 'wss://api2.poloniex.com'

function _call (url) {
  return new Promise((resolve, reject) => {
    fetch('https://cors-anywhere.herokuapp.com/' + ApiUrl + url)
      .then(r => r.json())
      .then(r => resolve(r))
      .catch(e => reject(e))
  })
}

const helpers = {
  alts: {
    'bcc': 'bch'
  },
  modifySymbols (symbols) {
    return symbols.map((value) => this.alts[value] || value)
  }
}

const rest = {
  async getSymbol (symbol) {
    // const response = await _call('/api/v1/exchangeInfo')

    // return [response.symbols.find(value => value.symbol === symbol)].map((value) => [value.baseAsset, value.quoteAsset])[0]
  },
  async ticker () {
    return await _call('public?command=returnTicker')
  }
}

const ws = {
  priceBak () {
    const socket = new autobahn.Connection({
      url: WsUrl,
      realm: 'realm1'
    })

    socket.onopen = function (session) {
      function tickerEvent (args, kwargs) {
        console.log(args, kwargs)
      }

      session.subscribe('ticker', tickerEvent)
    }

    socket.open()
  },
  async price (symbols, _cb) {
    symbols = helpers.modifySymbols(symbols)

    let symId = null
    const ticker = await rest.ticker()
    if (typeof ticker[symbols[1].toUpperCase() + '_' + symbols[0].toUpperCase()] !== 'undefined') {
      symId = ticker[symbols[1].toUpperCase() + '_' + symbols[0].toUpperCase()]['id']
    }

    const socket = new WebSocket(Ws2Url)

    socket.onopen = function () {
      socket.send(JSON.stringify({command: 'subscribe', channel: 1002}))
    }

    socket.onmessage = function (msg) {
      try {
        const response = JSON.parse(msg.data)
        if (response[0] === 1002 && response[2][0] === symId) {
          _cb(response[2][1])
        }
      } catch (e) {
        console.log('Poloniex socket error', e.message)
      }
    }

    return socket
  }
}

export default {
  ...helpers,
  ...rest,
  ws: ws
}
