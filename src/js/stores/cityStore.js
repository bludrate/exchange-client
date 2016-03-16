import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import actionNames from '../constants/actionNames';
import appConstants from '../constants/appConstants';

var CHANGE_EVENT = 'change';

var _currentCity = appConstants.DEFAULT_CITY;
var _cities = ['kiev','kharkov','vinnitsa','dnepropetrovsk','donetsk','zhitomir','zaporozhye','ivano-frankovsk','kievobl','kirovograd','lugansk','lutsk','lvov','nikolaev','odessa','poltava','rovno','sumy','ternopol','uzhgorod','kherson','khmelnitskiy','cherkassy','chernigov','chernovtsy'];

function changeCity(newCity) {
  if (_cities.indexOf(newCity) === -1) {
    console.warn('wrong city to set: ', newCity);

    return;
  }

  _currentCity = newCity;
}

var CityStore = Object.assign({}, EventEmitter.prototype, {
  getCurrentCity: function() {
    return _currentCity;
  },

  getCities: function() {
    return _cities;
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case actionNames.CITY.CHANGE:

      changeCity(action.city);

      CityStore.emitChange();

      break;

    default:
    // no op
  }
});

export default CityStore;