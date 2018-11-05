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
    const venue =this.state.venues.find(venue => venue.id = marker.id);

    FourSquareAPI.venueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
      console.log(newVenue);
    })
  }

  componentDidMount() {
    FourSquareAPI.search({
      near: 'Morgantown,WV',
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
     console.log(results);
    });
  }

  render() {
    return (
      <Map {...this.state}
      handleMarkerClick={this.handleMarkerClick}/>
    );
  }
}

export default App;
