// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import "./RefereeMatches.css";
import RefereeSideBar from "../RefereeSideBar/RefereeSideBar";
import { Layout, Input, Table, message } from "antd";
import axios from 'axios'
import baseUrl from "../../baseUrl/baseUrl";

const { Content } = Layout;

// Navbar component
const RefereeMatches = () => {
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [teamNameFilter, setTeamNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [assignEvents, setAssignEvents] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits , setLimits] = useState(3);

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
      console.log(res.data.user._id);
      setRefereeId(res.data.user._id);
    } catch (error) {
      message.error("Error inside the Get currentUserData function");
    }
  };

// Function to handle searching by event name
const handleEventNameSearch = async (value) => {
  console.log("Event Name Searched: ", value);
  try {
    if (value.trim() !== "") {
      const searchResponse = await axios.post(`${baseUrl}/api/v1/event/search-assignReferee-event`, { eventName: value });
      console.log(searchResponse);
      setAssignEvents(searchResponse.data.data);
      setTotal(searchResponse.data.totalData);
      setLimits(searchResponse.data.limit);
    } else {
      // If search value is empty, fetch all assignments
      getAssignMatches(refereeId, currentPage);
    }
  } catch (error) {
    message.error("Error inside the handleEventNameSearch function");
  }
};

  //  get assign matches
  const getAssignMatches = async (refereeId,page) => {
    try {
      const assignMatchResponse = await axios.post(`${baseUrl}/api/v1/event/assignReferee-event`, { refereeId , page });
      console.log(assignMatchResponse.data);
      setAssignEvents(assignMatchResponse.data.data.data);

      setTotal(assignMatchResponse.data.data.totalData);
      setLimits(assignMatchResponse.data.data.limit)
    } catch (error) {
      message.error("Failed to get assign matches");
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  useEffect(() => {
    if (refereeId) {
      getAssignMatches(refereeId,currentPage);
    }
  }, [refereeId,currentPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <RefereeSideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 0,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            {/* Search section */}
            <div className="search">
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%", marginBottom: "8px" }}
              >
                <Input.Search
                  placeholder="Search Event Name..."
                  style={{ flex: 1 }}
                  onSearch={handleEventNameSearch}
                
                  allowClear
                />
              </div>
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                    render: (text, record) => (
                      <span>{record.nameOfTheEvent}</span>
                    ),
                  },
                  {
                    title: "District",
                    dataIndex: "district",
                    key: "district",
                    render: (text, record) => (
                      <span>{record.location}</span>
                    ),
                  },
                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
                    render: (text, record) => (
                      <span>{record.eventNewDate}</span>
                    ),
                  },
                  {
                    title: "Event Time",
                    dataIndex: "eventTime",
                    key: "eventTime",
                    render: (text, record) => (
                      <span>{record.formattedTime}</span>
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
                dataSource={assignEvents} 
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </RefereeSideBar>
  );
};


export default RefereeMatches;
