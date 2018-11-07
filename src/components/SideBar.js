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

  //show venues in listview that match search query and hide venues that do not
  handleFilterVenues = () => {
    if(this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };

  //show markers that match search query and hide markers that do not
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
    //update superState in App.js
    this.props.updatSuperState({ markers });
  };

  render() {
    return (
      <section className="sideBar">
        <input
          aria-label={"Search"}
          tabIndex="0"
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
      </section>
    )
  }
}
