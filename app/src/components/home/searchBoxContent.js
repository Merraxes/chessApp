import React from 'react'
import '../style.css'
import socket from '../../connection/connector'
export default class SearchBoxContent extends React.Component{
    
    constructor(){
        super()
        this.state={
            color: 'white',
            slideValue: 60    
        };

        this.handleOnChangeSlider = this.handleOnChangeSlider.bind(this);
        this.handleOnClickColor = this.handleOnClickColor.bind(this);
        this.handleOnClickButton = this.handleOnClickButton.bind(this);
    }    
   
    handleOnChangeSlider = (e) => this.setState({slideValue: e.target.value});
    handleOnClickColor = (e) =>{
        var black = document.getElementById('black');
        var white = document.getElementById('white');
        var pieces = e.target;
        if(pieces.dataset.id='white'){
            this.setState({
                color: 'white'
            })
            black.style['background'] = '#262421';
        }

        if(pieces.dataset.id='black'){
            this.setState({
                color: 'black'
            })
            white.style['background'] = '#262421';
        }

        pieces.style['background'] = 'green';        
    }; 

    handleOnClickButton = () =>{
        socket.emit('preferences', {color: this.state.color, tempo: this.state.slideValue})
        this.props.close({});
    }
    render(){
        return(


            <React.Fragment>
                <div className="pieces-container">
                    <div data-id="white" onClick ={this.handleOnClickColor} className="pieces" id="white">White</div>
                    <div data-id="black" onClick ={this.handleOnClickColor} className="pieces" id="black">Black</div>
                </div>

                <div className = "tempo">
                    <div className="time-slider">
                        <input type="range" min={1} max={120} value={this.state.slideValue} 
                                className="slider" onChange={this.handleOnChangeSlider}/>
                        <div className="slider-value">
                            <p>Minutes per side: {this.state.slideValue}</p></div>
                    </div>
                </div>

                <div className="container-modalbox-button">
                    <button className="new-game-button" onClick={this.handleOnClickButton}>Create Game</button>
                </div>
            </React.Fragment>
        )
    }
}