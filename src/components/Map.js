/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap((props =>
    <main role="application">
      <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={props.center}
      >
        {props.markers &&
          //map over the isShowing markers to dasplay them
          props.markers.filter(marker => marker.isShowing).map((marker,idx,arr) => {
            //find matching venue.id & marker.id to display venue info in marker infowindow
            const venueDetails = props.venues.find(venue => venue.id === marker.id);
            return (
              <Marker
                key={idx}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  props.handleMarkerClick(marker);
                }}
                animation={marker.isOpen && (google.maps.Animation.BOUNCE)}
              >
                {marker.isOpen && (
                  <InfoWindow>
                    <div>
                      <p><b>{venueDetails.name}</b></p>
                      <p><b>{venueDetails.location.address}</b></p>
                      <p>Details provided by Foursquare</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
      </GoogleMap>
    </main>
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
