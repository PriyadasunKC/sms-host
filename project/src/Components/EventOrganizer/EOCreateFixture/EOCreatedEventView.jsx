import React, { useState, useEffect } from "react";
import "./EOCreatedEventView.css";
import axios from "axios";
import { Layout, Button, Input, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import EOSidebar from "../EOSideBar/EOSideBar";
import baseUrl from "../../baseUrl/baseUrl";

const { Content } = Layout;

export default function EOCreatedEventView() {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);
  const [teamname, setTeamName] = useState("");
  const [evedate, setEventDate] = useState("");
  const [createdEvent, setCreateEvent] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/event/pagination`, {
        page,
      });
      console.log("response", response);
      setCreateEvent(response.data.data.events);
      setTotal(response.data.data.totalDocuments);
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

  const handleDateSearch = (value) => {
    console.log("Event Date Searched: ", value);
    setEventDate(value);
  };

  const handleLocationSearch = async (value) => {
    try {
      const searchResponse = await axios.post(
        `${baseUrl}/api/v1/search/search-location`,
        { value }
      );
      console.log(searchResponse.data.data);
      setCreateEvent(searchResponse.data.data);
    } catch (error) {
      message.error("Error searching event location");
    }
  };

  // GET ALL CREATE EVENT
  const getAllCreateEvent = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/event/get-all-events`
      );

      if (response.data.success) {
        console.log(response);
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const handleCreateEventNavigate = async (record) => {
    navigate("/create-fixture", { state: { record } });
  };

  useEffect(() => {
    getAllCreateEvent();
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
              padding: 15,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            {/* Search section */}
            <div className="search">
              <Input.Search
                placeholder="Search by Location"
                styles={{
                  marginBottom: "9",
                }}
                onSearch={handleLocationSearch}
                allowClear
              />
            </div>
            {/* Table section */}
            <div className="tabContainer">
              <Table
                className="Tab"
                columns={[
                  {
                    title: "Event Name",
                    dataIndex: "EventName",
                    key: "EventName",
                    render: (text, record) => (
                      <span>{record.nameOfTheEvent}</span>
                    ),
                  },

                  {
                    title: " Location",
                    dataIndex: "Location",
                    key: "Location",
                    render: (text, record) => <span>{record.location}</span>,
                  },

                  {
                    title: "Event Date",
                    dataIndex: "EventDate",
                    key: "EventDate",
                    render: (text, record) => (
                      <span>{record.eventNewDate}</span>
                    ),
                  },

                  {
                    title: "Event Time",
                    dataIndex: "Event Time",
                    key: "EventTime",
                    render: (text, record) => (
                      <span>{record.formattedTime}</span>
                    ),
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
                          onClick={() => handleCreateEventNavigate(record)}
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
                          Create
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
                dataSource={createdEvent}
              ></Table>
              {console.log(dataSource)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </EOSidebar>
  );
}
