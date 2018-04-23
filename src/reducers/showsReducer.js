import * as types from '../types/shows'
import initialState from './initialState'

export default function showsReducer(state = initialState.shows, action){
    switch(action.type){
        case types.LOAD_SHOWS_SUCCESS:
            if(action.page === 1) {
                return action.shows
            }
            else {
                return [
                    ...state,
                    ...action.shows,
                ]
            }
        case types.DELETE_SHOWS_SUCCESS:
            const index = state.findIndex(show => show.id === action.id)
            console.log(index, action)
            //state.splice(index,1)
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        default:
        return state
  }
}