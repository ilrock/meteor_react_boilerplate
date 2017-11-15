import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            error: ""
        };
    }
    render(){
        return(
            <div className="container">
                <h1> Join </h1>
                {this.state.error ? <p className="error">{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button onClick={this.onSubmit.bind(this)}> Create Account </button>
                </form>
                <Link to="/"> Have an account? </Link>
            </div>
            
        );
    }

    onSubmit(e){
        e.preventDefault();

        this.props.createUser({
            email: this.refs.email.value.trim(),
            password: this.refs.password.value.trim()
        }, (err) => {
            if (err){
                this.setState({ error: err.reason })
            } else{
                this.setState({ error: "" })
            }
        });
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
};

export default createContainer(()=>{
    return{
        createUser: Accounts.createUser
    }
}, Signup);