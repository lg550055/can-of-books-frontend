import { Component } from 'react'
import { Button } from 'react-bootstrap';
import LoginForm from './LoginForm'

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: true
    }
  }

  render() {
    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
      <>
        {this.state.showButton ?
        <Button onClick={()=> this.setState({showButton: false})}>Log In</Button> :
        <LoginForm onLogin={this.props.onLogin} /> }
      </>
    )
  }
}