export default {
  drawChart (id, exchange, market) {
    /* eslint-disable */
    new TradingView.widget({
      container_id: id,
      autosize: true,
      symbol: exchange.toUpperCase() + ':' + market.toUpperCase(),
      interval: '1',
      timezone: 'exchange',
      theme: 'Dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_top_toolbar: true,
      save_image: false,
      hideideas: true
    })
    /* eslint-enable */
  }
}
