import React from 'react'
import Modal from 'react-modal'
import '../style.css'
import SearchBoxContent from './searchBoxContent';
export default class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showBox: false
        };
        this.handleOpenBox = this.handleOpenBox.bind(this);
        this.handleCloseBox = this.handleCloseBox.bind(this);

    }

    handleOpenBox(){
        this.setState({showBox: true})
    }

    handleCloseBox(){
        this.setState({showBox: false})
    }

    render(){
        return(
            <React.Fragment>
                  <Button onClick={this.handleOpenBox}/>
                    <Modal
                        transparent={true}
                        className = "modal-box"
                        style={{
                            overlay: {
                                zIndex: 1000,
                                background: 'rgba(0, 0, 0, 0.3)'
                            }}}
                        isOpen={this.state.showBox}   
                        onRequestClose={this.handleCloseBox}
                    >
                        <SearchBoxContent close={this.handleCloseBox}/>
                    </Modal>
            </React.Fragment>
              
            
        )
    }
    
};

const Button =({onClick}) => (
    <div className="container-button">
        <button onClick = {onClick} type = "button" className = "new-game-button">
            New Game
        </button>
    </div>
  
)