import React from 'react'

export default class PlayerInfo extends React.Component{
    render(){
        return(
            <div>Player: {this.props.player}    Time: {this.props.time}</div>
        )
    }
}