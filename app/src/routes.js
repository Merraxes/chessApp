import Home from './containers/home.js'
import Login from './components/log_reg/login.js'
import Register from './components/log_reg/register.js'
import Chessboard from './components/game/chessboard.js'
import NoMatchPage from './containers/no_found'

export default[
    {path:"/", exact: true, Component: Home},
    {path:"/login", exact: true, Component: Login},
    {path:"/register", exact: true, Component: Register},
    {path:"/chessboard/:roomId", exact: true, Component: Chessboard},
    {Component:NoMatchPage}
];