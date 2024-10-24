import { useState } from "react";


export default function GameBoard({ onSelectSqure, board }) {
 

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSqure(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });

  //     onSelectSqure()
  //   }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button disabled={playerSymbol !== null} onClick={() => onSelectSqure(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
