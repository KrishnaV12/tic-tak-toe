import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import { useState } from "react";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-cmbination";
import GameOver from "./component/GameOver";

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurn, setGameTurn] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurn);
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerName[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSqure(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => (currActivePlayer === "X" ? "O" : "X"));

    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player1" symbol="X" isActive={activePlayer === "X"} handlePlayerNameChange={handlePlayerNameChange} />
          <Player initialName="Player2" symbol="O" isActive={activePlayer === "O"} handlePlayerNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSqure={handleSelectSqure} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
