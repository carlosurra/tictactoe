import React, { Component } from "react";
import Cell from "./cell.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [null, null, null, null, null, null, null, null, null],
      advise: true,
      firstMove: false,
      cpuNext: true,
      lastIndexPlayer: null,
      lastIndexCpu: null,
    };
  }

  clickCell(i) {
    if (this.state.cells[i] || checkWinner(this.state.cells)) { return; }

    
    const cells = this.state.cells;

    cells[i] = this.state.cpuNext ? "X" : "O";

    if (this.state.cpuNext) {
      this.setState({
        lastIndexPlayer: i,
        advise: false,
        cells: cells, 
        cpuNext: false,
        firstMove: true,  
      })
    }

    if (this.state.cpuNext) {  
      setTimeout(() => {
        this.cpuTurn();
      }, 800); 
    }
  }

  cpuTurn() {
    const indexesOfEmptyCells = this.state.cells.reduce((acc, item, index) => {
      return item === null ? [...acc, index] : acc;
    }, []);

    if (!indexesOfEmptyCells.length) { return; }

    const indexToFlip = indexesOfEmptyCells[ Math.random() * indexesOfEmptyCells.length | 0];
    this.clickCell(indexToFlip);

    this.setState({ 
      cpuNext: true, 
      lastIndexCpu: indexToFlip,
    });

    return;
  }

  resetGame() {
    this.setState({
      cells: [null, null, null, null, null, null, null, null, null],
      cpuNext: true,
      firstMove: false,
      lastIndexPlayer: null,
      lastIndexCpu: null,
      advise: true,
    });
  }

  undoLastMove() {
    const checkingIndexes = [this.state.lastIndexCpu, this.state.lastIndexPlayer]
    console.log(checkingIndexes)
    const undo = this.state.cells.map((element, index) => checkingIndexes.includes(index) ? null : element);

    this.setState({
      cells: undo,
      lastIndexCpu: null,
      lastIndexPlayer: null,
    });
  }


  renderCell(i) {
    return (
      <Cell
        value={this.state.cells[i]}
        onClick={() => this.clickCell(i)}
      />
    );
  }

  render() {
    const checkStatus = checkWinner(this.state.cells);
    let status;
    if (checkStatus === "TIE") {
      status = "It's a TIE";
    } else if (checkStatus) {
      status = checkStatus + " is the winner";
    }

    return (
      <div className="wrapper">
        <div className="board">
          <div className="board-column">
            {this.renderCell(0)}
            {this.renderCell(1)}
            {this.renderCell(2)}
          </div>
          <div className="board-column">
            {this.renderCell(3)}
            {this.renderCell(4)}
            {this.renderCell(5)}
          </div>
          <div className="board-column">
            {this.renderCell(6)}
            {this.renderCell(7)}
            {this.renderCell(8)}
          </div>
        </div>
        <div className="board-actions">
            <button className={`${!this.state.firstMove ? 'disabled' : 'action_button'}`} onClick={() => this.resetGame()}>RESET</button>
            <button className={`${this.state.lastIndexPlayer === null ? 'disabled' : 'action_button'}`} onClick={() => this.undoLastMove()}>UNDO</button>
            <div className={`${this.state.advise === false ? 'disabled' : 'status'}`}>LET'S PLAY</div>
            <div className="status">{status}</div>
        </div>
      </div>
    );
  }
}

export default Board;

function checkWinner(cells) {
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let emptySpace = 0;

  for (let i = 0; i < winnerCombinations.length; i++) {
    const [a, b, c] = winnerCombinations[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === null) {
      emptySpace++;
    }
  }

  if (emptySpace === 0) {
    return "TIE";
  }

  return null;
}
