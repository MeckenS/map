import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import SideBar from'./components/SideBar';
import FourSquareAPI from './API/'




class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      venues: [],
      center: [],
      zoom: 12,
      updatSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers,markers)})
  }

  handleMarkerClick = (marker) => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)})
    //const venue = this.state.venues.find(venue => venue.id === marker.id);
    //console.log(venue);

    //FourSquareAPI.venueDetails(marker.id).then(res => {
      //const newVenue = Object.assign(venue, res.response.venue);
      //this.setState({venues: Object.assign(this.state.venues, newVenue)});
      //console.log(newVenue);
    //})
  }

  handleListItemClick = venue => {
    const marker = this.state.markers.find( marker => marker.id === venue.id);
    this.handleMarkerClick(marker)
  }

  componentDidMount() {
    FourSquareAPI.search({
      near: 'Frostburg,MD',
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
         isShowing: true,
         id: venue.id
       };
     });
     this.setState({ markers, venues, center });
     //console.log(results);
    });
  }

  render() {
    return (
      <div className="App">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;
