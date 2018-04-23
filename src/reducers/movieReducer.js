import * as types from '../types/movie'
import initialState from './initialState'

export default function moviesReducer(state = initialState.movie, action){
    switch(action.type){
        case types.LOAD_MOVIE_SUCCESS:
            return {
                movie:action.movie, 
                similar_movies:[], 
                recomended_movies:[]}
        case types.LOAD_SIMILAR_SUCCESS:
            return {
                movie:state.movie, 
                similar_movies: action.movies, 
                recomended_movies:[]}
        default:
            return {
                movie:state.movie, 
                similar_movies: [], 
                recomended_movies:[]}
  }
}
