import * as types from '../types/shows'
import { seriesURL } from '../utils'

export function loadShowsSuccess(shows, page){
    return { type: types.LOAD_SHOWS_SUCCESS, shows, page }

}

export function loadShowsFailure(){
    return { type: types.LOAD_SHOWS_FAILURE }
}

export function loadShows(page = 1, endpoint = 'popular'){
    return dispatch => {
        fetch(seriesURL[endpoint](page))
        .then(response => response.json())
        .then(json => json.results)
        .then(shows => dispatch(loadShowsSuccess(shows, page)))
        .catch(error => {
            dispatch(loadShowsFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function deleteShow(id){
    return {type: types.DELETE_SHOWS_SUCCESS, id}
}