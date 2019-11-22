import React  from 'react';
import '../style.css'
import SearchBox from './searchBox';
import socket from '../../connection/connector'
import {Link} from 'react-router-dom'


export default class GamesBoard extends React.Component{
    constructor(){
        super();
        this.state={
            showBox: false,
            player: 0,
            queue: []
        };
        this.handleOpenSearchBox = this.handleOpenSearchBox.bind(this);
        this.handleCloseSearchBox = this.handleCloseSearchBox.bind(this);
        this.handleClick = this.handleClick.bind(this);
    
    }


    componentDidMount(){
        socket.on('queue', queue =>{
            this.setState({
                queue: queue
            })        
            //console.log(this.state.queue);
        })  

        socket.on('playerId', playerId =>{
            this.setState({
                player: playerId,
            })
        })
    } 
    
    handleOpenSearchBox(){
        this.setState({showBox: true})
    }

    handleCloseSearchBox(){
        this.setState({showBox: false})
    }

    handleClick = (id)=>{
        var data = {roomId: id, player: this.state.player };
    //    console.log(data);
        socket.emit('joined', data );
    }

    render(){
        return(

            <div className="container">
                <div className="games-board">
                    <ul>
                        <li className="title-column">
                            <span className='cell' >Id</span>
                            <span className='cell'>Player</span>
                            <span className='cell'>Tempo</span>
                            <span className='cell'>Pieces</span>
                            
                        </li>
                    {
                        this.state.queue.map((item, index) =>{
                            return(

                                    <li key = {index} onClick = {() =>this.handleClick(item.roomId)}>
                                    <Link to = {'chessboard/'+item.roomId} >
                                            <span className='cell' >{item.roomId}</span>
                                            <span className='cell'>{item.players[0].playerId}</span>
                                            <span className='cell'>{item.tempo}</span>
                                            <span className='cell'>{item.players[0].color}</span>
                                    </Link>                                    
                                    </li>                 
                                
                            );
                        })
                    }     
                    </ul>
                </div>
                <SearchBox/>
            </div>                 
        );
    };
};
