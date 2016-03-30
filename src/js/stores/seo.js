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

let keyWords = {
  '/': 'курс валют, курс валют в обменках, курс доллара киев, курс евро киев, курс рубля киев, курс валют в обменках киева, курс валют киев, реальный курс валют, реальный курс доллара, актуальный курс валют, актуальный курс доллара',
  'auction': {
    'usd': 'доллар',
    'eur': 'евро',
    'rub': 'рубль',
    'usds': 'доллара',
    'eurs': 'евро',
    'rubs': 'рубля',
    'usdn': 'доллары',
    'eurn': 'евро',
    'rubn': 'рубли',
    'buy': 'продать',
    'sell': 'купить'
  }
};

let description = {
  '/': 'Актуальный средний курс валют на рынке Киева. Обьявления о покупке и продаже валют.',
  'auction': {
    'main': 'Актуальные обьявления о {type} {currency} в Киеве. Выбирай лучший курс.',
    'buy': 'покупке',
    'sell': 'продаже',
    'usd': 'доллара',
    'eur': 'евро',
    'rub': 'рубля'
  }
};

function getKeyWords( state ) {
  let url = state.location.pathname;

  if (url in keyWords) {
    return keyWords[ url ];
  }

  if ( ~url.indexOf('auction') ) {
    let currency = keyWords.auction[state.params.currency];
    let currencies = keyWords.auction[state.params.currency + 's'];
    let currencyn = keyWords.auction[state.params.currency + 'n'];
    let type = keyWords.auction[state.params.type];
    return type + ' ' + currency
        + ', ' + type + ' ' + currency + ' киев'
        + ', ' + type + ' ' + currencyn + ' киев'
        + ', ' + type + ' ' + currency + ' киев дорого'
        + ', киев ' + type + ' ' + currency + ' дорого'
        + ', киев ' + type + ' ' + currency
        + ', ' + type + ' наличный ' + currency + ' киев'
        + ', ' + type + ' ' + currency + ' в киеве'
        + ', обмен ' + currencies
        + ', черный рынок Киев, черный рынок ' + currency
  }

  return 'Валютная биржа Киев';
}

function getTitle( state ) {
  let url = state.location.pathname;

  if (url in titles) {
    return titles[ url ];
  }

  if ( ~url.indexOf('auction') ) {
    return titles.auction[state.params.type] + ' ' + titles['auction'][state.params.currency];
  }

  return 'Валютная биржа';
}

function getDescription( state ) {
  let url = state.location.pathname;

  if (url in description) {
    return description[ url ];
  }

  if ( ~url.indexOf('auction') ) {
    return description.auction['main'].replace('{type}', description['auction'][state.params.type]).replace('{currency}', description['auction'][state.params.currency]);
  }

  return 'Актуальный средний курс валют на рынке Киева. Обьявления о покупке и продаже валют.';
}

export default function( ) {
  document.title = getTitle( this.state );
  document.getElementById('keywords').content = getKeyWords( this.state );
  document.getElementById('description').content = getDescription( this.state );
};