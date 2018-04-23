import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Peli from '../../components/Movie'
import * as movieActions from '../../actions/movieActions'

class Movie extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movie: {},
            similar_movies: [],
            recommended_movies: [],
            sortBy: 'title-asc',
            similarVisible:false,
            recommendedVisible:false
        }
    }

    componentDidMount(){
        const { movieActions, match} = this.props

        movieActions.loadMovie(match.params.id)
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            movie: nextProps.movie.movie,
            similar_movies: nextProps.similar_movies,
            recommended_movies:nextProps.recommended_movies,
        })
    }

    chooseSimilar(e){
        const { movieActions, match} = this.props
        movieActions.loadSimilar(match.params.id, e) 
    }

    toogle(e){
        const{similarVisible,recommendedVisible} = this.state
        if(e==="similar"){
            if(similarVisible){
                this.setState({
                    similarVisible:false,
                    recommendedVisible:false
                })   
            }else{
                this.setState({
                    similarVisible:true,
                    recommendedVisible:false,
                    })  
                this.chooseSimilar(e)            
            }
        }if(e==="recommendations"){
            if(recommendedVisible){
                this.setState({
                    similarVisible:false,
                    recommendedVisible:false
                })  
            }else{
                this.setState({
                    similarVisible:false,
                    recommendedVisible:true,
                    })  
                this.chooseSimilar(e)            
            }
        }
    }

    render() {
        const { movie,similar_movies,recommendedVisible, similarVisible} = this.state
        return (
            <section className="container main movie" style={{backgroundImage: movie.id ? `url(https://image.tmdb.org/t/p/w342/${movie.backdrop_path})` : ''}}>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{movie.id ? movie.title : 'Loading...'}</h1>
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`}}>

                    </footer>
                    <div className="col-md-6 my-4" style={{backgroundColor: 'Black'}}>
                        <header className="w-100">
                            <h1>{movie.title}</h1>
                        </header>
                        <p className="d-block">{movie.overview}</p>
                    </div>
                </article>
                <aside className="row">
                <div className="form-group">
                            <button style={{color: 'Black', fontWeight:'bold',marginLeft:'20px'}}onClick={() =>{this.toogle('similar')}} > Top 20 similar movies
                        </button>
                        <button style={{color: 'Black', fontWeight:'bold',marginLeft:'20px'}}onClick={() =>{this.toogle('recommendations')}} > Top 20 recommended movies
                        </button>
                        </div>
                </aside>
                <div className="row movie-list-wrapper">
                {similarVisible || recommendedVisible ? this.state.similar_movies.map((peli, i) => {
                        return (
                            <Peli
                                key={i}
                                {...peli}
                            />
                        )
                    }):''
                }
                </div>   
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
        return {
            movie: state.movie,
            similar_movies: state.movie.similar_movies,
            recommended_movies: state.movie.recommended_movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        movieActions: bindActionCreators(movieActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)

