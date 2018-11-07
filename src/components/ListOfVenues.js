import React, { Component } from 'react';
import ListItem from './ListItem';

export default class ListOfVenues extends Component {
  render() {
    return (
      <ol className="listOfVenues">
        {this.props.venues &&
          //map over venues to display in list view
          this.props.venues.map((venue, idx) => (
            <ListItem
              key={idx}
              {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          ))}
      </ol>
    )
  }
}
