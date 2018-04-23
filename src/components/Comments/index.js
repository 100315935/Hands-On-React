import React from 'react'
import { connect } from 'react-redux'

import Entry from '../Comments/entry'

class Comments extends React.Component {
  constructor(props){
      super(props)
      
      this.state = {
          allcomments : [{
              name: 'Juan',
              entry: 'Esta serie me encanta, le doy un 10'
            }],
            name:"",
            entry:"",
            seeComments:false,
          };
          

      }
  
  send(){
    const {allcomments, entry,name} = this.state
    const comment={name,entry}
    console.log(comment)
    this.setState({
      allcomments: [...allcomments, comment] 
    })
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
          allcomments:[{
              name: nextProps.allcomments.name,
              entry: nextProps.allcomments.entry
            }]   
      })
      
  }

  valueNewName = e =>{
    const {name} = this.state
    this.setState({
      name: e.target.value
    })
  }

  valueNewEntry = e =>{
    const {entry} = this.state
    this.setState({
      entry: e.target.value
    })
  }

  toogle(){
    const {seeComments} = this.state
    if(seeComments)
    this.setState({
      seeComments: false
    })
    else{this.setState({
      seeComments: true
    })}
  }

  render() {
      const {allcomments, seeComments} = this.state
      return (
        <div className="overlay" style={{ backgroundColor: "grey" }}>
        <div className="card">
          <div className="card-header" />
          <button type="button" className="btn btn-dark" onClick={()=>{this.toogle()}}>See coments</button>
                {seeComments ? allcomments.map((entry, i) => {
                        <h4 className="card-title">Comments</h4>
                        return (
                            <Entry
                                key={i}
                                {...entry}
                            />
                        )
                    }):''
                }
                {seeComments ? <div>
              <h4 className="card-title">Introduce your comment</h4>
              <input type="text" className="form-control"  placeholder="Name: " onBlur={this.valueNewName}/>
              <input type="text" className="form-control"  placeholder="Comment: "onBlur={this.valueNewEntry} /> 
            <button type="button" className="btn btn-dark" onClick={()=>{this.send()}}>
                Post
              </button>
            </div>:''}
            
            <div className="card-footer text-muted" />
          </div>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
      numberOfMovies: state.movies.length
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

  


