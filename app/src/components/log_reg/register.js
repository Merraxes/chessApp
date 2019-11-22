import React from 'react';
import '../style.css'
import {Router, Switch, BrowserRouter, Link} from 'react-router-dom'

export default class Register extends React.Component{
    render(){
        return(
            <div className="login-page">
                <div className="form">                
                    <form className="login-form">
                        <input type="text" placeholder="name"/>
                        <input type="password" placeholder="password"/>
                        <input type="text" placeholder="email address"/>
                        <button>create</button>
                    
                            <p className="message">Already registered?<Link to = '/login' >Sign in</Link></p>
                    
                        
                    </form>
                </div>
            </div>
        )   
    };
};
