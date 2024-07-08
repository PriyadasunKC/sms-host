import React, { useState } from "react";
import "./EOBracket.css";
import EOSizeBar from "../EOSideBar/EOSideBar";
import baseUrl from "../../baseUrl/baseUrl";
const Bracket = () => {
  const [teams, setTeams] = useState([]);
  const [bracket, setBracket] = useState([]);

  const handleTeamNumberChange = (e) => {
    const num = e.target.value;
    if (num > 0) {
      const newTeams = Array.from({ length: num }, () => "");
      setTeams(newTeams);
      setBracket([newTeams]);
    } else {
      setTeams([]);
      setBracket([]);
    }
  };

  const handleTeamNameChange = (index, event) => {
    const newTeams = [...teams];
    newTeams[index] = event.target.value;
    setTeams(newTeams);
    const newBracket = [...bracket];
    newBracket[0] = newTeams;
    setBracket(newBracket);
  };

  const handleTeamSelect = (team, column, event) => {
    const newBracket = [...bracket];
    if (event.target.checked) {
      if (newBracket[column + 1]) {
        // Check if the team is already in the next level
        if (!newBracket[column + 1].includes(team)) {
          newBracket[column + 1].push(team);
        }
      } else {
        newBracket.push([team]);
      }
    } else {
      for (let i = column + 1; i < newBracket.length; i++) {
        newBracket[i] = newBracket[i].filter((t) => t !== team);
      }
    }
    setBracket(newBracket);
  };

  // Check if all team names are entered
  const allTeamNamesEntered = teams.every((team) => team.trim() !== "");

  return (
    <EOSizeBar>
      
    </EOSizeBar>
  );
};

export default Bracket;