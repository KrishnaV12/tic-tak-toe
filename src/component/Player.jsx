import { useState } from "react";
export default function Player({ initialName, symbol ,isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerNameData , setPlayerNameData] = useState(initialName)
  function handleEdit(){
    setIsEditing((editing)=> !editing)
  }

  function handlePlayerName(event){
    setPlayerNameData(event.target.value)
  }

  let playerName = <span className="player-name">{initialName}</span> 
  if(isEditing){
    playerName = <input type="text"  value={playerNameData} onChange={handlePlayerName} required/>
  }
  return (
    <li className={isActive ? "active"  : undefined} >
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
