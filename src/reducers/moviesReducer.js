import * as types from '../types/movies'
import initialState from './initialState'

export default function moviesReducer(state = initialState.movies, action){
    switch(action.type){
        case types.LOAD_MOVIES_SUCCESS:
            if(action.page === 1) {
                return action.movies
            }
            else {
                return [
                    ...state,
                    ...action.movies,
                ]
            }
            case types.DELETE_MOVIE_SUCCESS:
            const index = state.findIndex(movie => movie.id === action.id)
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
