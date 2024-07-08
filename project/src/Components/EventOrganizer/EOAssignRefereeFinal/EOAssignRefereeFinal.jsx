import React, { useState, useEffect } from "react";
import "./AssignRefereeFinal.css";
import axios from "axios";
import { Layout, Button, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import EOSidebar from "../EOSideBar/EOSideBar";
import baseUrl from "../../baseUrl/baseUrl";

const { Content } = Layout;

export default function EOAssignRefereeFinal() {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);
  const [teamname, setTeamName] = useState("");
  const [evedate, setEventDate] = useState("");
  const [createdEvent, setCreateEvent] = useState([]);
  const [addedEvents, setAddedEvents] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [restrictData, setRestrictData] = useState([]);
  const [addRefereeState, setAddRefereeState] = useState();
  const [alreadyAddedReferee, setAlreadyAddedReferee] = useState([]);

  console.log(location);
  // Filter userApplicationData based on userRole and Userlocation
  const handleDateSearch = (value) => {
    console.log("Event Date Searched: ", value);
    setEventDate(value);
  };

  const handleTeamNameSearch = (value) => {
    console.log("Team Name Searched: ", value);
    setTeamName(value);
  };

  const getAvailableReferee = async () => {
    try {
      const availabilityEventResponse = await axios.post(
        `${baseUrl}/api/v1/availability/event-available-referee`,
        { eventId: location.state.record._id }
      );
      console.log(availabilityEventResponse);
      if (availabilityEventResponse.data.success) {
        setDataSource(availabilityEventResponse.data.data);
        setAlreadyAddedReferee(
          availabilityEventResponse.data.alreadyAddedReferee
        );
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const handleRefereeAdd = async (refereeId) => {
    try {
      const addReferees = await axios.post(
        `${baseUrl}/api/v1/event/assignReferee`,
        { eventId: location.state.record._id, refereeId: refereeId }
      );
      const restrictRefereeAvailable = await axios.post(
        `${baseUrl}/api/v1/availability/restrictAssignReferees`,
        {
          eventNewDate: location.state.record.eventNewDate,
          eventId: location.state.record._id,
          assignRefereeId: refereeId,
        }
      );

      setRestrictData(restrictRefereeAvailable.data.data);

      if (addReferees.data.success) {
        message.success("Referee Assigned Successfully");
        getAvailableReferee();

        setAddedEvents("true");
      }

      console.log(addedEvents);
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const handleRefereeRemove = async (refereeId) => {
    try {
      // Check if the referee is already assigned
      if (!alreadyAddedReferee.includes(refereeId)) {
        return message.error(
          "This Referee is not assigned to the event.Therefore Cannot Remove Referee."
        );
      }

      const restrictRemoveRefereeAvailable = await axios.post(
        `${baseUrl}/api/v1/availability/restrictRemoveReferees`,
        {
          eventNewDate: location.state.record.eventNewDate,
          eventId: location.state.record._id,
          assignRefereeId: refereeId,
        }
      );
      const removeReferees = await axios.post(
       `${baseUrl}/api/v1/event/removeReferee`,
        { eventId: location.state.record._id, refereeId }
      );

      if (removeReferees.data.success) {
        message.success("Referee Removed Successfully");
        getAvailableReferee();
      }
    } catch (error) {
      message.error("Error removing referee");
    }
  };

  useEffect(() => {
    getAvailableReferee();
  }, []);

  return (
    <EOSidebar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 20,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            {/* Table section */}
            <div className="tabContainer">
              <Table
                className="Tab"
                columns={[
                  {
                    title: "Referee Name",
                    dataIndex: "CoachName",
                    key: "CoachName",
                    render: (text, record) => <span>{record.username}</span>,
                  },

                  {
                    title: "Email",
                    dataIndex: "Email",
                    key: "Email",
                    render: (text, record) => <span>{record.email}</span>,
                  },

                  {
                    title: "Actions",
                    dataIndex: "Actions",
                    key: "Actions",
                    render: (text, record) => (
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <Button
                          type="ghost"
                          ghost
                          onClick={() => handleRefereeAdd(record.id)}
                          style={{
                            backgroundColor: "blue",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Assign
                        </Button>

                        <Button
                          type="ghost"
                          ghost
                          onClick={() => handleRefereeRemove(record.id)}
                          style={{
                            backgroundColor: "red",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Remove
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                dataSource={dataSource}
              ></Table>
              {console.log(dataSource)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </EOSidebar>
  );
}
