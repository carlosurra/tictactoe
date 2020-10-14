import React, { Component } from "react";
import Board from "./board.js";

class Tictactoe extends Component {
  render() {
    return (
      <div className="tictactoe">
        <div className="tictactoe-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Tictactoe;
