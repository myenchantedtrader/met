// Example file of exchange api Object

const ApiUrl = 'rest api url'
const WsUrl = 'websocket url'

function _call (url) {
  return new Promise((resolve, reject) => {
    fetch('https://cors-anywhere.herokuapp.com/' + ApiUrl + url)
      .then(r => r.json())
      .then(r => resolve(r))
      .catch(e => reject(e))
  })
}

const helpers = {
  // Helpers function for merge all exhcanges
  alts: { // symbols with alternative name
    'bcc': 'bch' // [symbol]: [symbol on exchange]
  },
  formatSymbols (symbols : array) {
    return symbols.map((value) => this.alts[value] || value)
  }
}

const rest = {
  // rest api calls
  getSymbol (symbol : string) { // get asset and base symbol
    // return array [asset symbol, base symbol]
  },
  ticker () { // get all markets ticker
    // return only tickers {ticker: {information}, ticker: {information}}
  }
}

const ws = {
  // WebSocket api
  price (symbols : array, _cb : function) { // get price by symbol
    // call _cb with argument = price
    // return socket
  },
  ticker (symbols : array, _cb : function) { // get ticker by symbol
    // call _cb with argument = object {price: , change: , volume: , high: , low: }
    // return socket
  },
  trades (symbols : array, _cb : function) { // get trades
    // call _cb with argument = object {price: , quantity: , timestamp: }
    // return socket
  }
}


export default {
  helpers,
  rest,
  ws: ws
}
