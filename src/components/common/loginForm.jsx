import React, { Component } from 'react';
import Input from './input';
import Form from './form';
import Joi from 'joi-browser';

class LoginForm extends Form {
    state = {
        data: {username: '', password: ''},
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }
   
    
    doSubmit = () => {
        //call the server
        console.log('Submitted')
        
    }

    


    render() {
        const {data, errors}= this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                     <Input 
                     onChange={this.handleChange} 
                     name="username" 
                     value={data.username} 
                     label="Username"
                     error={errors.username}
                      />
                     <Input 
                     onChange={this.handleChange} 
                     name="password" 
                     value={data.password} 
                     label="Password"
                     error={errors.password}
                      />
                    <button disabled={this.validate()} className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;