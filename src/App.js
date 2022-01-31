import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              { this.props.auth0.isAuthenticated ? <BestBooks /> : <h4>Log in to see your books</h4> }
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route >
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
