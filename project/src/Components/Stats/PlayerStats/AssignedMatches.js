import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";


const UpcomingEvents = () => {
  const [playerId, setPlayerId] = useState(null);
  const [AssignMatchData, setAssignMatchData] = useState([]);

  // GET CURRENT USER DATA
  const currentUserData = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/v1/user/getCurrentUser`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPlayerId(res.data.user._id);
    } catch (error) {
      message.error("Error occurred inside the Get currentUserData function");
    }
  };

  const getAssignPlayerMatches = async () => {
    try {
      const assignEventResponse = await axios.post(
        `${baseUrl}/api/v1/event/getPlayerAssignEvent`,
        { playerId }
      );
      console.log(assignEventResponse.data);
      if (assignEventResponse.data.success) {
        const events = assignEventResponse.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10); // Take the first 10 elements
        setAssignMatchData(events);
      }
    } catch (error) {
      message.error("An error occurred while getting assigned matches data.");
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  useEffect(() => {
    if (playerId) {
      getAssignPlayerMatches();
    }
  }, [playerId]);

  const columns = [
    { dataIndex: "nameOfTheEvent", key: "nameOfTheEvent", title: "Event Name" },
    { dataIndex: "numberOfTeams", key: "numberOfTeams", title: "Team Name" },
    { dataIndex: "location", key: "location", title: "Event Date" },
  ];

  return (
    <Table
      dataSource={AssignMatchData} 
      columns={columns}
      pagination={false}
      showHeader={false} 
    />
  );
};

export default UpcomingEvents;
