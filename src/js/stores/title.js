let titles = {
  '/': 'Валютная биржа',
  'auction': {
    'buy': 'Покупают',
    'sell': 'Продают',
    'usd': 'доллар',
    'eur': 'евро',
    'rub': 'рубль'
  }
};
export default function( state ) {
  var url = state.location.pathname;

  if (url  in titles) {
    return titles[ url ];
  }

  if ( ~url.indexOf('auction') ) {
    return titles['auction'][state.params.type] + ' ' + titles['auction'][state.params.currency];
  }

  return 'Валютная биржа';
};