import React from 'react';
import ReactDOM from 'react-dom';
import GamesBoard from '../components/home/gamesBoard.js';
import NickLabel from '../components/home/nickLabel.js';

export default function Home(){
    return(
       <div className="container">
            <NickLabel/>
            <GamesBoard/>
       </div>
           
    );
};
