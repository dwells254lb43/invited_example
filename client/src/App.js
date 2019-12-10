import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import Complete from './Pages/Complete';


class App extends Component {
  render() {
    return (
      <Switch>
          <Route path='/complete' component={Complete} />
          <Route path='/' component={Register}/>
        </Switch>
    );
  }
}

export default App;