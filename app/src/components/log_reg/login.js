import React from 'react';
import '../style.css'

class Login extends React.Component{
    
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
       // const{ username, password} = this.state;
        console.log("submit");
    }


    render(){
        
        return(  
                <div className="login-page">
                    <div className="form">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <input type="text" name = "username" placeholder="username" value = {this.state.username} onChange={this.handleChange} required/>
                            <input type="password" name = "password" placeholder="password" value = {this.state.password} onChange={this.handleChange} required/>
                            <button type = "submit">Login</button>
                            <p className="message">Not registered? <a href ='/register'>Create an account</a></p>
                        </form>
                    </div>
                </div>
                
        )

        
    };
};
export default Login