import React, { useEffect, useState } from "react";
import "./CoachReviewPlayers.css";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Layout, Button, Table, message, Rate } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../baseUrl/baseUrl";
const { Content } = Layout;

const PlayerReviews = [
  {
    key: "1",
    pid: "P1",
    playerName: "Player 1",
    location: "Location 1",
    review: 2,
    Actions: "Action 1",
  },
  {
    key: "2",
    pid: "P2",
    playerName: "Player 2",
    location: "Location 2",
    review: 3,
    Actions: "Action 2",
  },
  {
    key: "3",
    pid: "P3",
    playerName: "Player 3",
    location: "Location 3",
    review: 4,
    Actions: "Action 3",
  },
];

const CoachReviewPlayers = () => {
  const [playerName, setPlayerName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [playerDetails, setPlayerDetails] = useState([]);
  const [playerReview, setPlayerReview] = useState([]);
  let sum = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  const [sortingReviews, setSortingReviews] = useState([]);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/player/player-pagination`,
        { page }
      );
      console.log("response", response);
      setPlayerDetails(response.data.data.players);
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

  const handleGetAllPlayerDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/player/player-details`
      );
      console.log(response.data.players);

      if (response.data.success) {
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleNavigate = async (id) => {
    console.log(id);
    navigate("/coach-review-form", { state: { id: id } });
  };

  const getReview = async () => {
    try {
      const reviewResponse = await axios.get(
        `${baseUrl}/api/v1/review/get-overall-review-without-pagination`
      );
      if (reviewResponse.data.success) {
        setPlayerReview(reviewResponse.data.data);
      }
    } catch (error) {
      message.error("Something went wrong inside the get Review section");
    }
  };

  const getPlayerWithSorting = async () => {
    try {
      const SortingReviewResponse = await axios.get(
        `${baseUrl}/api/v1/review/get-review-with-sorting`
      );

      if (SortingReviewResponse.data.success) {
        console.log(SortingReviewResponse.data.data);
        setSortingReviews(SortingReviewResponse.data.data);
      }
    } catch (error) {
      message.error("Something went wrong inside the get Review section");
    }
  };

  useEffect(() => {
    handleGetAllPlayerDetails();
    getReview();
    getPlayerWithSorting();
  }, []);

  const handlePlayerNameSearch = async (value) => {
    console.log(value);
    try {
      const searchResult = await axios.post(
        "http://localhost:8080/api/v1/player/search-player",
        { playerName: value }
      );
      console.log(searchResult.data.data);
      setPlayerDetails(searchResult.data.data);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <CoachSidebar>
      <Layout className="ant-layout-sider-children">
        <Layout>
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
            <div className="search"></div>
            <Table
              columns={[
                {
                  title: "Player Name",
                  dataIndex: "playerName",
                  width: "25%",
                  align: "center",
                  render: (text, record) => (
                    <span>{record.player.username}</span>
                  ),
                },
                {
                  title: "Email",
                  dataIndex: "location",
                  width: "15%",
                  align: "center",
                  render: (text, record) => <span>{record.player.email}</span>,
                },
                {
                  title: "Overall Review",
                  dataIndex: "review",
                  width: "15%",
                  align: "center",
                  render: (text, record) => {
                    return (
                      <div>
                        <Rate disabled value={record.overallReview} />
                      </div>
                    );
                  },
                },

                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "25%",
                  align: "center",
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
                        onClick={() => handleNavigate(record.player._id)}
                      >
                        Comment
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
              dataSource={sortingReviews}
            />
          </Content>
        </Layout>
      </Layout>
    </CoachSidebar>
  );
};

export default CoachReviewPlayers;
