import React, { Component } from "react";
import "../index.scss";

class Cell extends Component {
  render() {
    return (
      <button className="cell" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export default Cell;
