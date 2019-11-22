import React from 'react';
import PropTypes from "prop-types";
import '../style.css'
import Chess  from "chess.js";
import Chessboard from "chessboardjsx";
import socket  from '../../connection/connector';
import PlayerInfo from './playerInfo';

const WHITE_PIECES = 'white';
const BLACK_PIECES = 'black'

class PlayerVsPlayer extends React.Component{
    
    static propTypes = { children: PropTypes.func };

    state = {
        player: [],
        opponent: [],
        roomId: 0,
        play: true, 
        color: WHITE_PIECES,
        fen: 'start',
        dropSquareStyle: {},
        squareStyles: {},
        pieceSquare: '',
        square: '',
        history: [],
        draggable: true
      };
      
      componentDidMount() {
        this.game = new Chess();          
        //socket.emit('joined', {color: this.state.color});   
        
        socket.on('play', (msg) => {
            if(msg===this.state.roomId)
                this.setState(({})=>({
                    play: false
                }));
        });
        socket.on('game_config', msg=>{
          this.setState({
              player: msg
          })
          console.log(this.state.player);

        }) 
        socket.on('move', (msg)=>{
            if(msg.room===this.state.roomId){
                this.game.move(msg.move);
                this.setState(({ history, pieceSquare }) => ({
                    fen: this.game.fen(),
                    history: this.game.history({ verbose: true }),
                    squareStyles: squareStyling({ pieceSquare, history }),
                    draggable: true
                }));
            } 
        });


        socket.on('player', (msg) =>{      
          
          this.setState({
                player: msg  
            })
            console.log(this.state.player);
            if(msg.color==BLACK_PIECES)
              this.setState({
                draggable: false
            })
          })

        
          socket.on('opponent', (msg)=>{
              this.setState({
                opponent: msg
              })
            console.log("opponent" +this.state.opponent);
            socket.emit('play', msg.roomId);
          })
    };
    
      removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
          squareStyles: squareStyling({ pieceSquare, history })
        }));
      };
      
        
      onDrop = ({ sourceSquare, targetSquare }) => {
        let move = this.game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q' // always promote to a queen for example simplicity
        });
    
        // illegal move
        if (move === null) return 'snapback';

        this.setState(({ history, pieceSquare }) => ({
          fen: this.game.fen(),
          history: this.game.history({ verbose: true }),
          squareStyles: squareStyling({ pieceSquare, history }),
          draggable: false
         
        }));
        socket.emit('move', {move: move, board: this.state.fen, room: this.state.roomId});
      };
        
      render() {
        const { fen, squareStyles, draggable, player} = this.state;
    
        return this.props.children({
          squareStyles,
          position: fen,
          onDrop: this.onDrop,
          draggable: draggable,
          player: player
        });
      }
    }
    
    export default function WithMoveValidation() {


      return (
          <PlayerVsPlayer >
            {({
              position,
              onDrop,
              squareStyles,
              orientation,
              draggable,
              player
              }) => (  
              <div className='chessboard' >
                <PlayerInfo player={'0'} time={'0'} />    
                <Chessboard
                  calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
                  position={position}
                  onDrop={onDrop}
                  squareStyles={squareStyles}
                  orientation={player.color}
                  draggable={draggable}
                />
                <PlayerInfo/>
              </div>
            )}  
          </PlayerVsPlayer>
          
      
      );
    }
    
    const squareStyling = ({ pieceSquare, history }) => {
      const sourceSquare = history.length && history[history.length - 1].from;
      const targetSquare = history.length && history[history.length - 1].to;
    
      return {
        [pieceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        ...(history.length && {
          [sourceSquare]: {
            backgroundColor: 'rgba(255, 255, 0, 0.4)'
          }
        }),
        ...(history.length && {
          [targetSquare]: {
            backgroundColor: 'rgba(255, 255, 0, 0.4)'
          }
        })
      };
    };