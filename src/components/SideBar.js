import React, { Component } from 'react';
import ListOfVenues from './ListOfVenues';

export default class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Search for places"}
        />
        <ListOfVenues {...this.props} handleListItemClick={this.props.handleListItemClick}/>
      </div>
    )
  }
}
