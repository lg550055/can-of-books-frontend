import { Component } from "react";

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: e.target.username.value,
      email: e.target.email.value
    }
    this.props.onLogin(user)
  }

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='username' placeholder="user name" />
        <input name='email' placeholder="email" />
        <button type="submit">Log In</button>
      </form>
    );
  }
};

export default LoginForm;
