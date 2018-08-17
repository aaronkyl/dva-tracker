import React, { Component } from 'react';
import './App.css';
import DVATracker from './containers/DVATracker/DVATracker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DVATracker />
      </div>
    );
  }
}

export default App;
