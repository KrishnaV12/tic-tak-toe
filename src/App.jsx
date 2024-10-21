import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import { useState } from "react";
import Log from "./component/Log";

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurn);
  function handleSelectSqure(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) => (currActivePlayer === "X" ? "O" : "X"));

    setGameTurn((prevTurn) => {
      let currentPlayer = deriveActivePlayer(prevTurn)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="Player2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSqure={handleSelectSqure} turns={gameTurn} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
