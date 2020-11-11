import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
//ejercicio 2:
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
  }

  changeColor = event => {
    this.setState({ 
      clicked: !this.state.clicked 
    });
    if (this.props.onClick) this.props.onClick()     
  };

  render() {
    let btn_class = this.state.clicked ? "cambioColor" : "isActive";

    return (
      <button className={btn_class} onClick={this.changeColor}>
        {this.props.name}
      </button>
    );
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
      //ejercicio 2:
      clickedBtn : {},
      btnStyle: Array(9).fill(null)
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const ubicacion = this.state.history.slice(0, this.state.id + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
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
      xIsNext: (step % 2) === 0
    });
  }
  switch(){
    console.log("move");
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //ejercicio 1:
    let casilla = this.state.id;
    const empieza = this.state.id;
    if (empieza === 0){
      casilla = "Empieza la partida";
    }
    else if ( casilla === 0){
      casilla = "Fila 1 Columna 1";
    }
    else if ( casilla === 1){
        casilla = "Fila 1 Columna 2";
    }
    else if ( casilla === 2){
      casilla = "Fila 1 Columna 3";
    }
    else if ( casilla === 3){
      casilla = "Fila 2 Columna 1";
    }
    else if ( casilla === 4){
      casilla = "Fila 2 Columna 2";
    }
    else if ( casilla === 5){
      casilla = "Fila 2 Columna 3";
    }
    else if ( casilla === 6){
      casilla = "Fila 3 Columna 1";
    }
    else if ( casilla === 7){
      casilla = "Fila 3 Columna 2";
    }
    else if ( casilla === 8){
      casilla = "Fila 3 Columna 3";
    }


    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      // const casi = cas ? 
      //   'Estas en la casilla ' + cas : 
      //   'Hola';
      return (
        <div key={move}>
          <ul>
            <li>
              {/* ejercicio 2: */}
              <Button name={desc} onClick={() => this.jumpTo(move)} />
            </li>
          </ul>
        </div>        
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button  onClick={() => this.switch()}>Switch order</button>
          <div>{moves}</div>
          {/* ejercicio 1: */}
          <div>{casilla}</div>
        </div>
      </div>
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
      return squares[a];
    }
  }
  return null;
}
