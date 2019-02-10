import { queryString } from '@/utils'

// CoinCompare
const API_URL = 'https://min-api.cryptocompare.com'

function _call (url) {
  return new Promise((resolve, reject) => {
    fetch(API_URL + url)
      .then(r => r.json())
      .then(r => resolve(r))
      .catch(e => reject(e))
  })
}

async function getExchangesBySymbol (symbol, baseSymbol, limit = 5) {
  if (typeof symbol !== 'string' || typeof baseSymbol !== 'string') {
    return []
  }

  const response = await _call(`/data/top/exchanges?${queryString({fsym: symbol.toUpperCase(), tsym: baseSymbol.toUpperCase(), limit: limit})}`)

  return response.Data.map((value) => value['exchange']).sort()
}

async function getTopVolume (symbol, limit = 15) {
  return await _call(`/data/top/volumes?${queryString({tsym: symbol.toUpperCase(), limit: limit - 1})}`) // Limit - 1 because coincompare start from 0
}

async function getLatestNews () {
  return await _call(`/data/v2/news/?lang=EN&sortOrder=latest&extraParams=met`)
}

export default {
  getExchangesBySymbol,
  getTopVolume,
  getLatestNews
}
