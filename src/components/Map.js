/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap((props =>
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
    >
      {props.markers &&
        props.markers.filter(marker => marker.isShowing).map((marker,idx,arr) => {
          const venueDetails = props.venues.find(venue => venue.id === marker.id);
          return (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                props.handleMarkerClick(marker);
                console.log(marker);
              }}
              animation= {marker.isOpen && (google.maps.Animation.BOUNCE)}
            >
              {marker.isOpen && (
                <InfoWindow>
                  <div>
                    <p><b>{venueDetails.name}</b></p>
                    <p><b>{venueDetails.location.address}</b></p>
                    <p>Info provided by Foursquare</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
    </GoogleMap>
  ))
);


export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAWRgTBU_UaiG3IqOPQwIQNBWtDhLIhMK0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
};
