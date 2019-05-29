import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import Login from './Login';
import Game from './Game';
import { PrivateRoute } from './components/PrivateComponent';
import Signup from './Signup';


class App extends Component {
  constructor(props) {
    super(props);

  }
  logOutIn() {
    this.setState({ loggedIn: true });
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>
            <Switch>
              <PrivateRoute path="/game" component={Game} />
              <Route path="/game" component={Game} />
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />

              <Route path="/signup" component={Signup} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
