const port = process.env.PORT || 8080
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const Countdown = require('countdown-js');
var { Timer } = require('easytimer.js');

var app = express();

const server = http.createServer(app);
const io = socket(server);

var roomId = 0;
var games = Array(100);
var gamesAmount = 0;
var waitingGames = [];
var currentGames = [];

const WHITE_PIECES = 'white';
const BLACK_PIECES = 'black';
const FULL = 2;

for(let i = 0; i< games.length; i++){
    games[i] = {players: 0, pid: [0,0]};
}

var setPieces = function(color){
    if(color == WHITE_PIECES)
        return BLACK_PIECES;
    else if(color==BLACK_PIECES)
        return WHITE_PIECES;
}

var setTimer = function(tempo){
    var timer = new Timer();
    timer.start({countdown: true, precision: 'seconds', startValues:{minutes: 2}});
    timer.pause;
    return timer;
}

var setOpponent = function(player){
    if(player.playerId!=playerId)
        return {player};
}

var sendColor = function(player){
    if(player.playerId==playerId)
        return player.color;
}
var searchGame = function(preferences, playerId){
    if(gamesAmount==0 || games.length==0)
        return createGame(preferences.tempo, playerId);

    for(let game in games)
        if(game.pieces[preferences.color]==EMPTY && game.tempo==tempo)
            game.setPieces(preferences.color,playerId);

    return createGame(preferences.tempo, playerId);
}

const emitQueue = () => {
    io.emit('queue', waitingGames);
}

io.on('connection', function(socket){
   
    var playerId = Math.floor(Math.random()*100 +1);
    console.log(playerId+" Connected");
    emitQueue();

    socket.on('preferences',msg =>{
        
     //   console.log(msg.color, msg.tempo);
        roomId = ++gamesAmount;
        let player1;            
        player1 = {playerId: playerId, color: msg.color, time: msg.tempo};
        let players = [];
        players.push(player1);
        let game = {players: players, roomId: roomId, tempo: msg.tempo}
        waitingGames.push(game);
        emitQueue();
    });

    socket.emit('playerId', playerId)

    socket.on('joined', (data)=>{
      
        var player2 = {playerId: 0, color: 0, time: null};
        waitingGames.map(game => {

            if(game.roomId == data.roomId && game.players[0].playerId !== data.player){
                player2.playerId = data.player;
                player2.color = setPieces(game.players[0].color);
                player2.time = game.tempo
                game.players.push(player2)
                //console.log(game.players[0].playerId, data.player);
            }

            console.log(game.players);
            game.players.map(player=>{
                //console.log(playerId);
                if(player.playerId == playerId)//{
                    //console.log(player.playerId, playerId);
                    socket.emit('player', {color: player.color, playerId: player.playerId, time: player.time});
                    //console.log(player.color);
                if(player.playerId!=playerId)
                    socket.emit('opponent', {color: player.color, playerId: player.playerId, time: player.time});
                //}
                           
            })

            
            // console.log(color, opponent);

            if(game.players.length>=FULL){
                currentGames.push(game)
                waitingGames.splice(waitingGames.indexOf(game),1);   
            }
          //  console.log(game)
        });
    });
    
    socket.on('alert', function(msg){
        console.log(msg);
    });
    
    socket.on('disconnect', function(){
        for(let i=0; i<100; i++){
            if(games[i].pid[0]==playerId || games[i].pid[1]==playerId){
                games[i].players--;
            }
        }
        console.log(playerId +' disconected.');
    });
    
    socket.on('move', function(msg){
        socket.broadcast.emit('move',msg);
    });
    
    socket.on('play', function(msg){
        socket.broadcast.emit('play',msg);
    });
    
});

server.listen(port);
console.log("Connected");