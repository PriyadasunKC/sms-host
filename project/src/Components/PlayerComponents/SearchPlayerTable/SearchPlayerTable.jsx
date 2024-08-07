import React, { useState, useEffect } from "react";
import "./SearchPlayerTab.css";
import axios from "axios";
import { Layout, Input, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import baseUrl from "../../baseUrl/baseUrl";
const { Content } = Layout;

axios.defaults.baseURL = `${baseUrl}/api/v1/playerSearchTable`;

export default function SearchPlayerProfile() {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);
  const [email, setEmail] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/player/player-pagination`,
        { page }
      );
      console.log("response", response);
      setDataSource(response.data.data.players);
      setTotal(response.data.data.totalPlayers);
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

  // Filter userApplicationData based on userRole and Userlocation

  const handleTeamNameSearch = (value) => {
    console.log("Team Name Searched: ", value);
    setEmail(value);
  };

  // getdata  and search players
  const getFetchData = async (email) => {
    try {
      const response = await axios.get(
        `/get-search-player-profile?q=${email}&role=player`
      );
      console.log(response.data);

      if (response.data.success) {
        
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData(email);
  }, [email]);

  // Filter userApplicationData based on userRole and Userlocation
  const handlePlayerNameSearch = async (value) => {
    console.log(value);
    try {
      const searchResult = await axios.post(
        `${baseUrl}/api/v1/player/search-player`,
        { playerName: value }
      );
      console.log(searchResult.data.data);
      setDataSource(searchResult.data.data);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <PlayerSideBar>
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
            <div className="searched">
              <Input.Search
                className="searchInputName"
                placeholder="Search Player Name..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={handlePlayerNameSearch}
                allowClear
              />
            </div>
            {/* Table section */}
            <div className="tabContainer">
              <Table
                className="Tab"
                columns={[
                  {
                    title: " Name",
                    dataIndex: "Name",
                    key: "Name",
                    render: (text, record) => <span>{record.username}</span>,
                  },

                  {
                    title: "Email",
                    dataIndex: "Email",
                    key: "Email",
                    render: (text, record) => <span>{record.email}</span>,
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
                dataSource={dataSource}
              ></Table>
              {console.log(dataSource)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
}
