import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import FourSquareAPI from './API/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      venues: [],
      center: [],
      zoom: 12
    };
  }

  componentDidMount() {
    FourSquareAPI.search({
      near: 'Cumberland,MD',
      query: 'Pizza',
      limit: 10
    }).then(results => {
     const { venues } = results.response;
     const { center } = results.response.geocode.feature.geometry;
     const markers = venues.map(venue => {
       return {
         lat: venue.location.lat,
         lng: venue.location.lng,
         isOpen: false,
         isShowing: true
       };
     });
     this.setState({ markers, venues, center });
     console.log(results);
    });
  }

  render() {
    return (
      <Map {...this.state}/>
    );
  }
}

export default App;
