import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import Show from '../../components/Show'

import * as showsActions from '../../actions/showsActions'

class TVShows extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            shows: [],
            page: 1,
            loadingShows: false,
            nowViewing: 'popular',
            sortBy: 'name-asc',
            viewingThisYearOnly: false
        }
    }

    componentDidMount(){
        const { nowViewing, page } = this.state
        const { showsActions } = this.props

        showsActions.loadShows(page, nowViewing)
        window.addEventListener("scroll", this.infiniteScroller, false);
    }

    infiniteScroller =  e => {
        const { showsActions } = this.props
        const { page, nowViewing } = this.state
        const scrollTop = window.scrollY
        const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
        const pctScrolled = Math.floor(scrollTop/trackLength * 100)
        if(pctScrolled > 95 && !this.state.loadingShows) {
            showsActions.loadShows(page, nowViewing)
            this.setState({
                loadingShows: true
            })
        }
    }

    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.infiniteScroller, false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.shows.length > this.state.shows.length) {
            this.setState({
                loadingShows: false,
                page: this.state.page + 1,
                shows: nextProps.shows
            })
        }
        else {
            this.setState({
                shows: nextProps.shows,
                loadingShows: false
            })
        }
    }

    onViewingChange = e => {
        const nowViewing = e.target.value
        const { showsActions } = this.props
        showsActions.loadShows(1, nowViewing)
        this.setState({
            page: 2,
            loadingShows: true,
            nowViewing
        })
    }

    onSortChange = e => {
        this.setState({sortBy: e.target.value})
    }

    sortShows = shows => {
        const { sortBy } = this.state
        const sorting = sortBy.split('-')

        return _.orderBy(shows, sorting[0], sorting[1])
    }

    onToggleViewingThisYearOnly = e => {
        this.setState({viewingThisYearOnly: !this.state.viewingThisYearOnly})
    }

    filterShows = shows => {
        return shows.filter(show => {
            return show.first_air_date.includes('2017')
        })
    }

    prepareShows = shows => {
        const { viewingThisYearOnly } = this.state
        let filteredShows = viewingThisYearOnly ? this.filterShows(shows) : shows
        console.log(filteredShows.length)
        return this.sortShows(filteredShows)
    }

    render() {
        const { shows, nowViewing, sortBy, viewingThisYearOnly } = this.state
        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                        <h1>{shows.length > 0 ? 'Shows' : 'Loading...'}</h1>
                    </div>
                </header>
                <aside className="row">
                    <div className="form-group">
                        <label>Now viewing:</label>
                        <select className="form-control" onChange={this.onViewingChange} defaultValue={nowViewing}>
                            <option value="popular">Popular</option>
                            <option value="topRated">Top Rated</option>
                            <option value="airing_today">Airing Today</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select className="form-control" onChange={this.onSortChange} defaultValue={sortBy}>
                            <option value="name-asc">Title (Asc)</option>
                            <option value="name-desc">Title (Desc)</option>
                            <option value="popularity-asc">Less Popular</option>
                            <option value="popularity-desc">More Popular</option>
                            <option value="vote_average-asc">Worst</option>
                            <option value="vote_average-desc">Best</option>
                            <option value="first_air_date-asc">Oldest</option>
                            <option value="first_air_date-desc">Newest</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" onChange={this.onToggleViewingThisYearOnly} type="checkbox" checked={viewingThisYearOnly} />
                            Released in 2017
                        </label>
                    </div>
                </aside>
                <div className="row movie-list-wrapper">
                    {this.prepareShows(shows).map((show, i) => {
                        return (
                            <Show
                                key={i}
                                funct={()=>this.props.showsActions.deleteShow(show.id)}
                                {...show}
                            />
                        )
                    })}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        shows: state.shows
    }
}

function mapDispatchToProps(dispatch){
    return {
        showsActions: bindActionCreators(showsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShows)

