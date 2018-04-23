import React from 'react'

const Entry = ({name,entry}) => (
    <div className="card-body" style={{border: 'solid grey'}}>
    <p className="card-text" style={{fontWeight:'bold'}}>{name}</p>
    <p>{entry}</p>
    </div>
)

export default Entry