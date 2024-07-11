import React, { useEffect, useState } from "react";
import SideBar from "../EOSideBar/EOSideBar";
import axios from "axios";
import { Button, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, ToTopOutlined } from "@ant-design/icons";
import baseUrl from "../../baseUrl/baseUrl";

export default function FinalizeFixtureUpdate() {
  const [newTeamdata, setnewTeamData] = useState([]);
  const [fixtures, setFixture] = useState([]);
  const navigate = useNavigate();

  const getAllFixtures = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/update/all-fixtures`);
      console.log(response.data.allFixtures);
      setFixture(response.data.allFixtures);
    } catch (error) {
      message.error("Error in fetching data");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(`${baseUrl}/api/v1/update/delete`, {
        id: id,
      });
      message.success("Data deleted successfully");
      window.location.reload();
    } catch (error) {
      message.error("Error in deleting data");
    }
  };

  const handleUpdate = async (id) => {
    navigate("/final-update-fixture", { state: { id: id } });
  };

  useEffect(() => {
    getAllFixtures();
  }, []);

  return (
    <>
      <SideBar>
        <div className="fixtureContainer">
          <Table
            className="Table"
            columns={[
              {
                title: "Teams Name",
                dataIndex: "teamName",

                render: (text, record) => (
                  <>
                    <span>
                      {/* {record.newTeam} */}
                      {setnewTeamData(record.newTeam)}
                      {newTeamdata.map((data) => (
                        <ul>
                          <li>{data}</li>
                        </ul>
                      ))}
                    </span>
                  </>
                ),
              },

              {
                title: "Event Time",
                dataIndex: "time",
                render: (text, record) => <span>8.30am</span>,
              },

              {
                title: "Location",
                dataIndex: "location",
                render: (text, record) => <span>premadasa</span>,
              },

              {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                  <>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#00ff7f",
                        color: "#fff",
                        fontSize: "14px",
                        borderRadius: "5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginLeft: "50px",
                      }}
                      onClick={() => handleUpdate(record._id)}
                    >
                      <ToTopOutlined />
                      Update
                    </Button>

                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#D94D34",
                        color: "#fff",
                        fontSize: "14px",
                        borderRadius: "5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(record._id)}
                    >
                      <DeleteOutlined />
                      Delete
                    </Button>
                  </>
                ),
              },
            ]}
            pagination={{
              style: {
                marginTop: "50px",
              },
              pageSize: 100,
            }}
            dataSource={fixtures}
          ></Table>
        </div>
      </SideBar>
    </>
  );
}
