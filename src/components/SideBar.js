import React, { Component } from 'react';
import ListOfVenues from './ListOfVenues';

export default class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }
  handleFilterVenues = () => {
    if(this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      console.log(venues)
      return venues;
    }
    return this.props.venues;
  };
  handleChange = e => {
    this.setState({ query: e.target.value });

    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
    const marker = this.props.markers.find(marker => marker.id === venue.id);
    if (isMatched) {
      marker.isShowing = true;
    } else {
      marker.isShowing = false;
    }
    return marker;
    });
    this.props.updatSuperState({ markers });
  };
  render() {
    return (
      <div className="sideBar">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Search for places"}
          onChange={this.handleChange}
        />
        <ListOfVenues
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    )
  }
}
