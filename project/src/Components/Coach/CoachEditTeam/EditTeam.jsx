import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Button, Table } from "antd";
import "./CoachEditTeam.css";
import baseUrl from "../../baseUrl/baseUrl";

const EditTeam = () => {
  const [coach_id, setCoach_id] = useState();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const coachId = searchParams.get("coach_id");
    setCoach_id(coachId);
    console.log("Coach ID:", coachId);
    console.log("Coach_ID:", coach_id);
  }, [location.search]);

  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (coach_id) {
      axios
        .get(
          `${baseUrl}/api/v1/coach/teams?coach_id=${coach_id}`
        )
        .then((res) => {
          console.log(res.data);
          setTeams(res.data);
          setDataSource(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [coach_id]);

  const handleEdit = (team) => {
    navigate(`/update-team`, { state: { team } });
  };

  const handleDelete = async (team_id) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/v1/coach/delete-team?team_id=${team_id}`
      );
      if (res.data.success) {
        console.log("Team removed : ", team_id);
        setTeams(dataSource.filter((team) => team._id !== team_id));
        window.location.reload();
      }
    } catch (err) {
      console.log("team delete error :\n", err);
    }
  };

  const [columns, setColumns] = useState([
    {
      title: "Team No",
      dataIndex: "teamNo",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            className="Button"
            style={{
              backgroundColor: "#52c41a",
              color: "#fff",
              fontSize: "large",
              marginRight: "10px",
              borderRadius: "5px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "100px",
              padding: "2px",
            }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          | &nbsp;
          <Button
            type="primary"
            className="Button"
            style={{
              backgroundColor: "red",
              color: "#fff",
              fontSize: "large",
              marginRight: "10px",
              borderRadius: "5px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "100px",
              padding: "2px",
            }}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  const [dataSource, setDataSource] = useState([]);

  return (
    <CoachSidebar>
      <Table
        columns={columns}
        dataSource={dataSource}
        className="table"
        pagination={{ pageSize: 5 }}
      />
    </CoachSidebar>
  );
};

export default EditTeam;
