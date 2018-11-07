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

  //closes any open marker infowindow when another marker is clicked
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers,markers)})
  }

  //sets marker.isOpen to true to display marker infowindow & marker animation
  handleMarkerClick = (marker) => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)})
  }

  //when list item is clicked the corresponding marker is set to marker.isOpen to display infow window & animation
  handleListItemClick = venue => {
    const marker = this.state.markers.find( marker => marker.id === venue.id);
    this.handleMarkerClick(marker)
  }

  componentDidMount() {
    //fetch request to Fouresquare api using helper file, then map through response & use info to setState to display
    //markers and center map
    FourSquareAPI.search({
      near: 'Baltimore,MD',
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
       //Fouresquare API error handler
    }).catch(function() {
        alert("Sorry, we are having trouble showing Baltimore's favorite pizza joints at the moment please try again later");
    });
    //Google Maps API error handler
    window.gm_authFailure = () => {
      alert("Sorry, we are having trouble loading Google Maps at the moment please try again later");
    };
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
