import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            error: ""
        };
    }

    render(){
        return(
            <div className="container">
                <h1> Login </h1>
                {this.state.error ? <p className="error">{this.state.error}</p> : undefined}                
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button onClick={this.onSubmit.bind(this)}> Login </button>
                </form>
                <Link to="/signup"> Don't have an account? </Link>
            </div>
        );
    }

    onSubmit(e){
        e.preventDefault();
        
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        this.props.loginWithPassword({email}, password, (err) => {
            if (err){
                this.setState({ error: err.reason })
            } else{
                this.setState({ error: "" })
            }
        })
    }
}

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
};

export default createContainer(()=>{
    return{
        loginWithPassword: Meteor.loginWithPassword
    }
}, Login);