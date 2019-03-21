import React, { Component } from 'react';

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
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input name="username" value={account.username}  onChange={this.handleChange} id="username" type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" value={account.password} onChange={this.handleChange} id="password" type="text" className="form-control"/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;