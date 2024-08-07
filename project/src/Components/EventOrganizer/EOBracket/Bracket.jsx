import axios from "axios";
import React, { useEffect, useState } from "react";
import EOSizeBar from "../EOSideBar/EOSideBar";
import { Select } from "antd";
import "./Bracket.css";
import baseUrl from "../../baseUrl/baseUrl";
const { Option } = Select;

const TournamentBracket = () => {
  const [matches, setMatches] = useState([]);

  const [pairs, setPairs] = useState([]);

  const [winnersArray, setWinnersArray] = useState([]);
  const [roundNo, setroundNo] = useState(1);
  const [finalWinner, setFinalWinner] = useState(null);

  const [rounds, setRounds] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selectedMatchId, setSelectedMatchId] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/organizer/matches`)
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pairsGet = async () => {
    try {
      console.log(roundNo, " : roundNo");
      console.log(selectedMatchId, " : matchId");
      const response = await axios.get(
        `${baseUrl}/api/v1/organizer/create-round/${selectedMatchId}/${roundNo}`
      );
      console.log("data received : ", response.data);
      setPairs(response.data);
    } catch (error) {
      console.error("Error fetching pairs:", error);
    }
  };
  const handleSelectMatch = (event) => {
    setSelectedMatchId(event.target.value);
  };

  const handleNextRound = () => {
    axios
      .post(
        `${baseUrl}/api/v1/organizer/setWinners/${selectedMatchId}/${roundNo}`,
        { winnersArray }
      )
      .then((res) => {
        console.log(winnersArray);
        console.log(`Round ${roundNo} winners sent successfully:`, res.data);
        setroundNo(roundNo + 1);
        setWinnersArray([]);
        setPairs([]);

        const radioButtons = document.querySelectorAll(
          "input[type=radio]:checked"
        );
        radioButtons.forEach((button) => {
          button.checked = false;
        });

        if (res.data.finalWinner) {
          console.log(res.data.message, " : ", res.data.finalWinner);
          setFinalWinner(res.data.finalWinner);
        }
      })
      .catch((err) => {
        console.log(`Error sending round ${roundNo} result:`, err);
      });
  };

  const handleTeamSelection = (pairIndex, teamIndex) => {
    const updatedwinnersArray = [...winnersArray];
    updatedwinnersArray[pairIndex] = pairs[pairIndex][teamIndex];
    setWinnersArray(updatedwinnersArray);
  };

  const handleViewWinners = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/v1/organizer/getWinners/${selectedMatchId}`
      );
      console.log("102 : winn", res.data.match);
      setRounds(res.data.match.rounds);
      console.log(" 104 ; rounds w", res.data.match.rounds);
      setTeams(res.data.match.nameOfTheTeam);
      console.log("rounds w", rounds);
    } catch (err) {
      console.error("Error fetching rounds to get respective winners:", err);
    }
  };

  const handleReselect = async () => {
    window.location.reload();
  };

  return (
    <EOSizeBar>
      <div
        style={{
          margin: 10,
          padding: 10,
          height: "80vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          className="custom-card bg-light"
        >
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="card-body"
          >
            <select
              className="select-lg mb-3 "
              onChange={handleSelectMatch}
              value={selectedMatchId}
            >
              <option value="default">Select a match</option>{" "}
              {/* Default option */}
              {matches.map((match) => (
                <option key={match._id} value={match._id}>
                  {match.nameOfTheEvent} {match.matchNo}
                </option>
              ))}
            </select>
            {/*<p className='card-title'>Selected Match : {selectedMatchId}</p>*/}
          </div>

          {!finalWinner && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  alignSelf: "center",
                  fontWeight: "bolder",
                  fontSize: 25,
                }}
              >
                Round - {roundNo}
              </div>

              {pairs.length == 0 && (
                <button onClick={pairsGet} className="btn-success ">
                  get pairs
                </button>
              )}
              {/* Section for selecting winners */}
              {pairs && (
                <div style={{ display: "flex", gap: "2rem" }}>
                  {pairs.map((pair, pairIndex) => (
                    <div
                      key={pairIndex}
                      className="custom-card"
                      style={{
                        margin: 10,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {pair.map((team, teamIndex) => (
                        <div key={teamIndex} className="form-check-container">
                          <label className="form-check-label">{team}</label>
                          <input
                            className="form-check-input"
                            type="radio"
                            style={{ width: 20 }} // Adjust radio button size as needed
                            name={`pair${pairIndex}`}
                            onChange={() =>
                              handleTeamSelection(pairIndex, teamIndex)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Button to move to the next round */}
              {pairs.length > 0 && (
                <button onClick={handleNextRound} className="btn-dark">
                  Next Round
                </button>
              )}
            </div>
          )}

          {finalWinner && (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  margin: 20,
                  padding: 20,
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Final winner is :{" "}
                <span style={{ color: "blue" }}>{finalWinner}</span>
              </div>
              <button className="btn-dark" onClick={handleReselect}>
                Re-select the Winners
              </button>
            </div>
          )}
        </div>

        {/*view winners*/}

        <div
          style={{
            marginTop: 30,
            width: "auto",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="custom-card"
        >
          <button className="btn-dark" onClick={handleViewWinners}>
            View winners
          </button>
          {
            <div style={{ display: "flex", alignItems: "center" }}>
              {rounds.map(
                (round) =>
                  round.winners && (
                    <div
                      className="custom-card bg-info"
                      key={round.roundNumber}
                      style={{
                        border: "1px solid black",
                        margin: 5,
                        padding: 5,
                      }}
                    >
                      <h5 style={{ textAlign: "center", margin: 0 }}>
                        Round No : {round.roundNumber}
                      </h5>
                      {/* &nbsp; =&gt; Winners : {round.winners.join(', ')} */}

                      <div>
                        {round.pairs.map((pair, pairIndex) => (
                          <div key={pairIndex}>
                            <ul
                              className="custom-card bg-dark text-light"
                              style={{
                                listStyleType: "none",
                                marginBottom: 2,
                                padding: 0,
                              }}
                            >
                              {pair.map((team, teamIndex) => {
                                const tName = teams.find(
                                  (t) => t /*._id*/ === team
                                ); /*.teamName*/
                                return (
                                  <li
                                    key={teamIndex}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: 3,
                                    }}
                                  >
                                    <span className="form-check-label">
                                      {tName}
                                    </span>
                                    <input
                                      type="radio"
                                      style={{ width: 20 }}
                                      className="form-check-input"
                                      checked={round.winners.some(
                                        (winner) => winner /*._id*/ === team
                                      )}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          }
        </div>
      </div>
    </EOSizeBar>
  );
};

export default TournamentBracket;