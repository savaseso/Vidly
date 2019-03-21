import React, { Component } from 'react';
import Input from './input';

class LoginForm extends Component {
    state = {
        account: {username: '', password: ''}
    }
    handleChange = e => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value
        this.setState({account});
    }

    handleSubmit = e => {

        e.preventDefault();

        //call the server
        console.log('Submitted')
    }

    render() {
        const {account}= this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                     <Input 
                     onChange={this.handleChange} 
                     name="username" 
                     value={account.username} 
                     label="Username" />
                     <Input 
                     onChange={this.handleChange} 
                     name="password" 
                     value={account.password} 
                     label="Password" />
                    
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;