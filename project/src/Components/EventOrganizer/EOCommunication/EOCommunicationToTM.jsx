import React, { useEffect, useState } from "react";
import "./EOCommunicationToTM.css";
import EOSizeBar from "../EOSideBar/EOSideBar";
import { Layout, Button, Input, Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../baseUrl/baseUrl";
const { Content } = Layout;

const EOCommunicationToTM = () => {
  const initialDataSource = [
    {
      key: "1",
      tmName: "Team Manager 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "2",
      tmName: "Team Manager 2",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "3",
      tmName: "Team Manager 3",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "4",
      tmName: "Team Manager 4",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "5",
      tmName: "Team Manager 5",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "6",
      tmName: "Team Manager 6",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "7",
      tmName: "Team Manager 7",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "8",
      tmName: "Team Manager 1",
      location: "New York",
      actions: "N/A",
    },
  ];

  const [eventName, setEventName] = useState();
  const [EventLocation, setEventLocation] = useState();
  const [EventDate, setEventDate] = useState();
  const [dataSource, setDataSource] = useState(initialDataSource);
  const navigate = useNavigate();
  const [createdEvent, setCreatedEvent] = useState([]);
  const [TeamManagers, setTeamManagers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/team-manager/pagination`,
        { page }
      );
      console.log("response", response);
      setTeamManagers(response.data.data.TM);
      setTotal(response.data.data.totalTM);
      setLimits(response.data.data.limit);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  //  get all event organizers
  const getOnlyCoach = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/team-manager/details`
      );

      if (response.data.success) {
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  // filter data
  const handleEventNameSearch = async (value) => {
    console.log("Event Name Searched: ", value);
    try {
      const searchResponse = await axios.post(
        `${baseUrl}/api/v1/search/filterTM`,
        { TMName: value }
      );
      console.log(searchResponse);

      if (searchResponse.data.success) {
        setTeamManagers(searchResponse.data.data);
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  // console the value to search location of the event
  const handleEventLocationSearch = (value) => {
    console.log("Event Location Searched: ", value);
  };

  // console the value to search date of the event
  const handleDateChange = (date, dateString) => {
    console.log("Event Date Selected: ", dateString);
  };

  useEffect(() => {
    getOnlyCoach();
  }, []);

  return (
    <EOSizeBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "15px",
              padding: "0",
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            {/* Search section */}
            <div className="search">
              <Input.Search
                placeholder="Search Team Manager Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={handleEventNameSearch}
                allowClear
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                columns={[
                  {
                    title: "Team Manager Name",
                    dataIndex: "tmName",
                    key: "tmName",
                    render: (text, record) => <span>{record.username}</span>,
                  },
                  {
                    title: "Email",
                    dataIndex: "email",
                    key: "email",
                    render: (text, record) => <span>{record.email}</span>,
                  },
                  {
                    title: "Actions",
                    dataIndex: "actions",
                    key: "actions",
                    render: (text, record) => (
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          onClick={() => {
                            navigate("/eo-communication-to-tm-form", {
                              state: { record: record },
                            });
                          }}
                          style={{
                            backgroundColor: "#52c41a",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "auto",
                          }}
                        >
                          Message
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },

                  current: currentPage ? currentPage : 1,
                  total: total,
                  pageSize: limits,
                  onChange: handlePagination,
                }}
                dataSource={TeamManagers}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </EOSizeBar>
  );
};

export default EOCommunicationToTM;
