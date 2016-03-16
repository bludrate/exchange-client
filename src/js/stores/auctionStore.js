import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import actionNames from '../constants/actionNames';
import appConstants from '../constants/appConstants';
import CityStore from './cityStore';

var CHANGE_EVENT = 'change';

var _rates;
var _timeout;

var RatesStore = Object.assign({}, EventEmitter.prototype, {
  init: function() {
    this.fetchRates().then((rates) => {
      _rates = rates;

      this.emitChange(CHANGE_EVENT);

      _timeout = setTimeout(this.init.bind(this), this.refreshDelay);
    }, (err) => {
      console.error(err);
      _timeout = setTimeout(this.init.bind(this), 500);
    });
  },
  stop: function() {
    clearTimeout(_timeout);
  },
  fetchRates() {
    return fetch(appConstants.URLS.SERVER + '/rates?city=' + CityStore.getCurrentCity()).then((res) => res.json());
  },
  getRates: function() {
    return _rates;
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

export default RatesStore;