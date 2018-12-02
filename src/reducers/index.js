import { combineReducers } from "redux";


const initialState = {
    data: [],
    loading: false,
    results: null,
    error: null
};


const  eventsReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'FETCH_EVENTS_BEGIN':

        return {
          ...state,
          loading: true,
          error: null
        };
  
      case 'FETCH_EVENTS_SUCCESS':

        return {
          ...state,
          loading: false,
          data: action.payload
        };
  
      case 'FETCH_EVENTS_FAILURE':
    
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          data: []
        };

      case 'FETCH_EVENTS_RESULTS_FOUND':
        return {
            ...state,
            loading: false,
            results: action.payload.results

        };
  
      default:
        
        return state;
    }
}

const selectedEventReducer = (selectedEvent = null, action) => {
    if(action.type === 'EVENT_SELECTED'){
        return action.payload;
    }else if(action.type === 'NO_EVENT_SELECTED'){
        selectedEvent = null;
    }

    return selectedEvent;
}

const eventByPositionReducer = (eventsByPosition=null, action) => {
    if(action.type === 'API_SEARCH_BY_POSITION'){
        return action.payload;
    }

    return eventsByPosition;
}

export default combineReducers({
    events: eventsReducer,
    selectedEvent: selectedEventReducer,
    eventsByPosition: eventByPositionReducer
});