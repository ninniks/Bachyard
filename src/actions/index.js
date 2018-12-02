import axios from 'axios';
const keys = require('../config/keys');


export function fetchEvents (term) {
    return dispatch => {
        dispatch(fetchEventsBegin());
        return axios.get(`https://api.songkick.com/api/3.0/events.json?apikey=${keys.songKickAPI}&artist_name=${term}`)
                    .then(res => { dispatch(fetchEventsSuccess(res.data.resultsPage.results.event), dispatch(fetchEventsResultsFound(res.data.resultsPage.totalEntries)));
                    return res;
                    })
                .catch(error => dispatch(fetchEventsFailure(error)));
    };
}

export const fetchEventsBegin = () => ({
    type: 'FETCH_EVENTS_BEGIN'
});
  
export const fetchEventsSuccess = events => ({
    type: 'FETCH_EVENTS_SUCCESS',
    payload: { events }
});
  
export const fetchEventsFailure = error => ({
    type: 'FETCH_EVENTS_FAILURE',
    payload: { error }
});

export const fetchEventsResultsFound = results => ({
    type: 'FETCH_EVENTS_RESULTS_FOUND',
    payload: { results }
});

export const selectEvent = (event) => dispatch => {

    dispatch({
        type: 'EVENT_SELECTED',
        payload: event
    })
};

export const returnToEventsList = () => dispatch => {
    dispatch({
        type: 'NO_EVENT_SELECTED'
    })
};


export const searchEventByPosition = (lat, lng) => async dispatch => {
    const res = await axios.get(`https://api.songkick.com/api/3.0/events.json?apikey=${keys.songKickAPI}&location=geo:${lat},${lng}`)

    dispatch({type: 'API_SEARCH_BY_POSITION', payload: res});
}

