import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import "./CoachCreateTeam.css";
import { Button, Table } from "antd";
import baseUrl from "../../baseUrl/baseUrl";

const CreateTeam = () => {
  const navigate = useNavigate();
  //const [matches, setMatches] = useState([])
  const [coach_id, setCoach_id] = useState();
  const [coachId, setCurrentCoachId] = useState("");

  const location = useLocation();


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const coachId = searchParams.get("coach_id");
    setCoach_id(coachId);

    // Do something with the coachId, such as fetching data for that coach
    console.log("Coach ID:", coachId);
    console.log("Coach_ID:", coach_id);
  }, [location.search]);

  useEffect(() => {
    if (coach_id) {
      axios
        .get(
          `${baseUrl}/api/v1/coach/matches?coach_id=${coach_id}`
        )
        .then((res) => {
          console.log(res);
          setDataSource(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [coach_id]);

  const handleCreate = (match_id) => {
    const searchParams = new URLSearchParams(location.search);
    const coach_id = searchParams.get("coach_id");
    navigate(`/select-players?matchId=${match_id}&coachId=${coach_id}`);
  };

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "nameOfTheEvent",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          className="Button"
          style={{
            backgroundColor: "#52c41a",
            color: "#fff",
            fontSize: "14px",
            marginRight: "10px",
            borderRadius: "5px",
            marginTop: "auto",
            marginBottom: "auto",
            width: "100px",
          }}
          onClick={() => handleCreate(record._id)}
        >
          Create
        </Button>
      ),
    }
   
  ]);

  const [dataSource, setDataSource] = useState([]);

  return (
    <CoachSidebar>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        className="table"
      />
    </CoachSidebar>
  );
};

export default CreateTeam;