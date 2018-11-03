import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import FourSquareAPI from './API/'

class App extends Component {

  componentDidMount() {
    FourSquareAPI.search({
      near: 'Cumberland,MD',
      query: 'Pizza',
      limit: 10
    }).then(results => console.log(results));
  }
  render() {
    return (
      <Map />
    );
  }
}

export default App;
