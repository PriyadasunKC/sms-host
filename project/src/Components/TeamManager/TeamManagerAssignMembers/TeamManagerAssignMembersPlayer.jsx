// Importing necessary libraries and components
import React, { useState } from "react";
import "./TeamManagerAssignMembersPlayer.css";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import { Layout, Input,Switch, Table, Image, DatePicker, Rate, message } from "antd";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const TeamManagerAssignMembersPlayer = () => {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const sampleData = [
    {
      key: "1",
      profile:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image",
      playerName: "John Doe",
      rating: 4.5,
      comment: "Well done keep it up!",
      assignTeam: true,
    },
    {
      key: "2",
      profile:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image",
      playerName: "Jane Smith",
      rating: 3,
      comment: "Need to improve bowling side.",
      assignTeam: false,
    },
    {
      key: "3",
      profile:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image",
      playerName: "Bob Johnson",
      rating: 3.5,
      comment: "Excellent Bowling!",
      assignTeam: true,
    },
  ];

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  //filter
  const handleCoachNameSearch = (value) => {
    console.log("Coach Name Searched: ", value);
  };
  
  // JSX structure for the Navbar component
  return (
    <TeamManagerSideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 24,
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
                  placeholder="Search Player Name..."
                  style={{ flex: 1 }}
                  onSearch={handleCoachNameSearch}
                  // onChange={(e) => handleCoachNameSearch(e.target.value)}
                  allowClear
                />
              </div>
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%" }}
              ></div>
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "Profile",
                    dataIndex: "profile",
                    key: "profile",
                    render: () => (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Image
                          width={100}
                          preview={false}
                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Player Name",
                    dataIndex: "playerName",
                    key: "playerName",
                  },
                  {
                    title: "Rating",
                    dataIndex: "rating",
                    key: "rating",
                    render: (rating) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Rate disabled defaultValue={rating} />
                        <span
                          style={{ marginLeft: "25px" }}
                        >{`${rating} / 5.0`}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Comment",
                    dataIndex: "comment",
                    key: "comment",
                  },
                  {
                    title: "Assign to Team",
                    dataIndex: "assignTeam",
                    key: "assignTeam",
                    render: (assignTeam, record) => (
                      <div className="center-content">
                        <Switch
                          defaultChecked={assignTeam}
                          onChange={onChange}
                        />
                      </div>
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the frontend
                dataSource={sampleData} // Use filteredData instead of sampleData
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
  );
};

// Exporting the Navbar component
export default TeamManagerAssignMembersPlayer;
