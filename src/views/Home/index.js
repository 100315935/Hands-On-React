import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Movie from '../../components/Movie'
/* import Show from '../../components/Show' */
import * as moviesActions from '../../actions/moviesActions'
/* import * as showsActions from '../../actions/showsActions' */

class Home extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movies: [],
            /* shows:[], */
            page: 1,
            nowViewing: 'popular',
        }
    }

    componentDidMount(){
        const { nowViewing, page } = this.state
        const { moviesActions/* , showsActions */ } = this.props

        moviesActions.loadMovies(page, nowViewing)
        /* showsActions.loadShows(page, nowViewing) */
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.movies.length > this.state.movies.length||nextProps.shows.length > this.state.shows.length) {
            this.setState({
                page: this.state.page + 1,
                movies: nextProps.movies,
                /* shows: nextProps.shows */
            })
        }
        else {
            this.setState({
                movies: nextProps.movies,
                /* shows: nextProps.shows */
            })
        }
    }

    chooseRandom(movies, shows){
        /* const number=Math.random();
            if(number<0.5){ */
                return movies[Math.floor(Math.random()*10)]
            /* }
            else{
                return shows[Math.floor(Math.random()*10)]
            } */
    }

    render () {
        const { movies/* ,shows */} = this.state
        return (
            <section className="container main home">
                <header className="row">
                    <div className="col-12">
                        <h1>Our favorite this month:</h1>
                    </div>
                </header>
                <div className="row movie-list-wrapper">
                            <Movie
                                {...this.chooseRandom(movies/* , shows */)}
                            />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movies: state.movies,
        /* shows: state.shows */
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
        /* showsActions: bindActionCreators(showsActions, dispatch), */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

