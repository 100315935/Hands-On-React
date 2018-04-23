import * as types from '../types/movie'

export function loadMovieSuccess(movie){
    return { type: types.LOAD_MOVIE_SUCCESS, movie }
}

export function loadMovieFailure(){
    return { type: types.LOAD_MOVIE_FAILURE }
}

export function loadSimilarSuccess(movies, page){
    return { type: types.LOAD_SIMILAR_SUCCESS, movies, page }
}

export function loadSimilarFailure(){
    return { type: types.LOAD_SIMILAR_FAILURE }
}

export function loadMovie(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(movie => dispatch(loadMovieSuccess(movie)))
        .catch(error => {
            dispatch(loadMovieFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadSimilar(id, endpoint){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(json => json.results)
        .then(similar_movies => dispatch(loadSimilarSuccess(similar_movies, 1)))
        .catch(error => {
            dispatch(loadSimilarFailure())
            alert('We could not load the page at this time.')
        })
    }
}






