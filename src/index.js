import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
  return (
    <button 
      // ejercicio 5:
      className={"square " + (props.highlight ? "highlight" : "")} 
      onClick={props.onClick}>
        {props.value}
    </button>
  );
}
// {props.stepNumber === move ? 'cambioColor' : 'inActive'}+
class Board extends React.Component {
  renderSquare(i) {
    // ejercicio 5:
    let winningSquare = false;
    if (this.props.winningPos && this.props.winningPos.indexOf(i) >= 0) {
      winningSquare = true;
    }

    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        // ejercicio 5:
        highlight={winningSquare}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //ejercicio 3:
    const board = [];
    let cellCounter = 0;

    for (let i = 0; i < 3; i += 1) {
      const columns = [];
      for (let j = 0; j < 3; j += 1) {
        columns.push(this.renderSquare(cellCounter++));
      }
      board.push(<div key={i} className="board-row">{columns}</div>);
    }
    return board;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      //ejercicio 1:
      id: 0,
      //ejercicio 4:
      toggleAsc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    //console.log(calculateWinner());
    this.setState({
      history: history.concat([
        {
          squares: squares,
          // ejercicio 1:
          currentLocation: getLocation(i)
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      //ejercicio 1:
      id: i
      
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  //ejercicio 4:
  switch(){
      this.setState({
        toggle: "desc",
        toggleAsc: !this.state.toggleAsc
      })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let moves = history.map((step, move) => {
      
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      //ejercicio 1:
      const casilla = step.currentLocation;
      return (
          <ul key={move}>
            <li>
              {/* ejercicio 2: */}
              <button className={this.state.stepNumber === move ? 'cambioColor' : 'inActive'} onClick={() => this.jumpTo(move)} >
                {/* ejercicio 1: */}
                {desc} {casilla}
              </button>
            </li>
          </ul>       
      );
      
    });
    let status;
    // ejercicio 5:
    let winPos;
    if (winner) {
      status = "Winner: " + winner.winner;
      winPos = winner.winPos;
    }
    //ejercicio 6:
    else if(!current.squares.includes(null)){
      status = "It's a draw";
    }
    else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            // ejercicio 5:
            winningPos={winPos}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/* ejercicio 4: */}
          <button  onClick={() => this.switch()}>Switch {this.state.toggleAsc ? "asc" : "desc"}</button>
          <div>{this.state.toggleAsc ? moves : moves.reverse()}</div>
        </div>
      </div>
      // {moves}
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        //ejercicio 5:
        winner: squares[a],
        winPos: lines[i]
      };
    }
  }
  return null;
}
// EJERCICIO 1:
const getLocation = (move) => { 
  switch (move){
    case 0:
      move = "Fila 1 Columna 1";
      break;
    case 1:
      move = "Fila 1 Columna 2";
      break;
    case 2:
      move = "Fila 1 Columna 3";
      break;
    case 3:
      move = "Fila 2 Columna 1";
      break;
    case 4:
      move = "Fila 2 Columna 2";
      break;
    case 5:
      move = "Fila 2 Columna 3";
      break;
    case 6:
      move = "Fila 3 Columna 1";
      break;
    case 7:
      move = "Fila 3 Columna 2";
      break;
    case 8:
      move = "Fila 3 Columna 3";
      break;
    default:
      break;
  }
 return move;
};

