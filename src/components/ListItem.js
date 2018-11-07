import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    return(
      <li
      className="listItem"
      tabIndex="0"
      onKeyPress={() => this.props.handleListItemClick(this.props)}
      onClick={() => this.props.handleListItemClick(this.props)}
      >
        {this.props.name}
      </li>
    )
  }
}
