import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from 'axios';
import baseUrl from "../../baseUrl/baseUrl";

const CreatedTeams = () => {
  const [createdTeams, setCreatedTeams] = useState([]);

  const getCreatedTeams = async () => {
    try {
      const createdTeamsResponse = await axios.get(`${baseUrl}/api/v1/team/get-created-team`);
      const teams = createdTeamsResponse.data.data.map((team, index) => ({
        key: index + 1,
        teamNo: team.teamNo, // Assuming the response has teamNo
        teamName: team.teamName, // Assuming the response has teamName
      }));
      setCreatedTeams(teams);
    } catch (error) {
      message.error("Error while fetching created teams");
    }
  };

  useEffect(() => {
    getCreatedTeams();
  }, []);

  const columns = [
    { title: "Team Number", dataIndex: "teamNo", key: "teamNo" },
    { title: "Team Name", dataIndex: "teamName", key: "teamName" }
  ];

  return (
    <Table
      dataSource={createdTeams}
      columns={columns}
      pagination={false}
      showHeader={false}
    />
  );
};

export default CreatedTeams;
