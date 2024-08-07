import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../Components/baseUrl/baseUrl";

const SelectPlayers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const matchId = params.get("matchId");
  const coachId = params.get("coachId");

  const [teamData, setTeamData] = useState({
    matchId: matchId,
    coachId: coachId,
    teamNo: "",
    teamName: "",
    selectedPlayers: [],
  });

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/coach/players?matchId=${matchId}&coachId=${coachId}`)
      .then((res) => {
        console.log(res.data);
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matchId, coachId]);

  const handleAdd = async (player_id) => {
    // Check if the player ID is already selected
    const index = teamData.selectedPlayers.indexOf(player_id);
    if (index === -1) {
      setTeamData({
        ...teamData,
        selectedPlayers: [...teamData.selectedPlayers, player_id],
      });
    } else {
      const updatedPlayers = [...teamData.selectedPlayers];
      updatedPlayers.splice(index, 1);
      setTeamData({
        ...teamData,
        selectedPlayers: updatedPlayers,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/coach/create-team`, teamData);
      if (res.data.success) {
        console.log("Team data saved successfully: ", res.data.team);
        navigate("/create-team");
      } else {
        console.error("Failed to save team data: ", res.data.error);
      }
    } catch (err) {
      console.error("Error while saving team data: ", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  return (
    <div>
      <div style={{ margin: 20, padding: 20, textAlign: "center" }}>
        CreateTeam <br />
        <form>
          Team Name :{" "}
          <input
            type="text"
            name="teamName"
            value={teamData.teamName}
            onChange={handleChange}
          />
          Team No :{" "}
          <input
            type="text"
            name="teamNo"
            value={teamData.teamNo}
            onChange={handleChange}
          />
        </form>
      </div>

      <div style={{ margin: 10, padding: 10 }}>
        <table style={{ border: "solid 1px grey", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "darkblue", color: "white" }}>
              <th>Player No</th>
              <th>Player Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {players.map(
              (player, index) =>
                player.Status === "available" &&
                !player.matches.includes(matchId) && (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{player.PlayerNo}</td>
                    <td style={{ textAlign: "center" }}>
                      {player.FirstName} {player.LastName}
                    </td>
                    <td style={{ textAlign: "center" }}>{player.District}</td>
                    <td style={{ textAlign: "center" }}>
                      <button onClick={() => handleAdd(player._id)}>
                        {teamData.selectedPlayers.includes(player._id)
                          ? "Remove"
                          : "Add"}
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      {
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      }
    </div>
  );
};

export default SelectPlayers;
