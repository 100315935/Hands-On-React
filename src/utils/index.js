export const moviesURL = {
    upcoming: page => {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    topRated: page => {
        return `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    similar: id => {
        return `https://api.themoviedb.org/3/discover/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
    },
    recommendations: id => {
        return `https://api.themoviedb.org/3/discover/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
    }
}

export const seriesURL = {
    airingtoday: page => {
        return `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    topRated: page => {
        return `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    }
}