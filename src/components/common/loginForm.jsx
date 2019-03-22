import React, { Component } from 'react';
import Input from './input';

class LoginForm extends Component {
    state = {
        account: {username: '', password: ''},
        errors: {}
    }
    validate = () => {
        const errors = {};

        const {account} = this.state;
        if(account.username.trim()=== '')
            errors.username = "Username is required";
        if(account.password.trim()=== '')
            errors.password = "Password is required";
        return Object.keys(errors) === 0 ? null : errors;
    }
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if(errors) return;

        //call the server
        console.log('Submitted')
    }

    handleChange = e => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value
        this.setState({account});
    }


    render() {
        const {account, errors}= this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                     <Input 
                     onChange={this.handleChange} 
                     name="username" 
                     value={account.username} 
                     label="Username"
                     error={errors.username}
                      />
                     <Input 
                     onChange={this.handleChange} 
                     name="password" 
                     value={account.password} 
                     label="Password"
                     error={errors.password}
                      />
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;