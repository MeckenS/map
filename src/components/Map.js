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
        props.markers.filter(marker => marker.isShowing).map((marker,idx) => {
            const venueDetails = props.venues.find(venue => venue.id = marker.id);
            return (
              <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.handleMarkerClick(marker)}>
              {marker.isOpen && venueDetails.bestPhoto && (
                <InfoWindow>
                  <div>
                    <img src={`${venueDetails.bestPhoto.prefix}200x200${venueDetails.bestPhoto.suffix}`}
                    alt={"venue"}
                    />
                    <p>{venueDetails.name}</p>
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
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
};
