import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import actionNames from '../constants/actionNames';
import appConstants from '../constants/appConstants';
import CityStore from './cityStore';

var CHANGE_EVENT = 'change';

var _auction = [];
var _timeout;

var AuctionStore = Object.assign({}, EventEmitter.prototype, {
  init: function(currency, type) {
    this.fetchAuction(currency, type).then((auctionList) => {
      _auction = auctionList;

      this.emitChange(CHANGE_EVENT);

      _timeout = setTimeout(this.init.bind(this, currency, type), appConstants.RATES_REFRESH);
    }, (err) => {
      console.error(err);
      _timeout = setTimeout(this.init.bind(this, currency, type), 500);
    });
  },

  stop: function() {
    clearTimeout(_timeout);
  },

  fetchPhone(id) {
    return fetch(appConstants.URLS.SERVER + '/number?userId=' + id).then((res) => res.text());
  },

  fetchAuction(currency, type) {
    var data = {
      city: CityStore.getCurrentCity(),
      currency: currency,
      type: type
    };

    var query = [];

    for (let key in data) {
      query.push( key + '=' + data[key] );
    }

    return fetch(appConstants.URLS.SERVER + '/auction?' + query.join('&') ).then((res) => res.json());
  },

  getData: function() {
    return _auction;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

export default AuctionStore;