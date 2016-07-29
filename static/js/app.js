import { render } from 'react-dom';
import Home from './components/home.jsx';
import Main from './components/main.jsx';
import LoginForm from './components/login.jsx';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={LoginForm} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={LoginForm} />
    </Route>
  </Router>);

render(routes, document.getElementById('khali'));
