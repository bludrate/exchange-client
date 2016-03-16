import AppDispatcher from '../dispatcher/AppDispatcher';
import actionConstants from '../constants/actionConstants';

export default {
  change: function(city) {
    AppDispatcher.dispatch({
      actionType: actionConstants.CITY.CHANGE,
      city: city
    });
  }
};