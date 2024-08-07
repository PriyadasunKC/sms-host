import React, { useEffect, useState } from "react";
import "./EOCommunicationToCoach.css";
import EOSizeBar from "../EOSideBar/EOSideBar";
import { Layout, Button, Input, Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../baseUrl/baseUrl";

const { Content } = Layout;

const EOCommunicationToCoach = () => {
  const initialDataSource = [
    {
      key: "1",
      coachName: "Coach 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "2",
      coachName: "Coach 2",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "3",
      coachName: "Coach 2",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "4",
      coachName: "Coach 4",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "5",
      coachName: "Coach 5",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "6",
      coachName: "Coach 6",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "7",
      coachName: "Coach 7",
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

  const [coaches, setCoaches] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/coach/pagination`, {
        page,
      });
      console.log("response", response);
      setCoaches(response.data.data.coaches);
      setTotal(response.data.data.totalCoaches);
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
      const response = await axios.get(`${baseUrl}/api/v1/coach/details`);
      // console.log(response);
      if (response.data.success) {
        // setCoaches(response.data.data)
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
        `${baseUrl}/api/v1/search/filterCoaches`,
        { coachName: value }
      );

      if (searchResponse.data.success) {
        setCoaches(searchResponse.data.data);
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
              margin: "20px",
              padding: 0,
              minHeight: 280,
              background: "whitesmoke",
            }}
          >
            {/* Search section */}
            <div className="search">
              <Input.Search
                placeholder="Search Coach Name..."
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
                    title: "Coach Name",
                    dataIndex: "coachName",
                    key: "coachName",
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
                            navigate("/eo-communication-to-coach-form", {
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
              
                dataSource={coaches}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </EOSizeBar>
  );
};

export default EOCommunicationToCoach;
