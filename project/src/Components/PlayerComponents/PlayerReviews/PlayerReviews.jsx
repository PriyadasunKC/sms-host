// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import "./PlayerReviews.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Input, Table, Rate, message } from "antd";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";

const { Content } = Layout;

// Navbar component
const PlayerReviews = () => {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPlayerId, setCurrentPlayerId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPlayerReviews, setCurrentPlayerReviews] = useState([]);
  const [reviewGivenCoachId, setReviewGivenCoachId] = useState([]);
  const [reviewGivenCoachName, setReviewGivenCoachName] = useState([]);
  const [reviewGivenCoachEmail, setReviewGivenCoachEmail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  //GET CURRENT USER DATA
const currentUserData = async (page) => {
  try {
    const res = await axios.get(`${baseUrl}/api/v1/user/getCurrentUser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Update the state with the current user ID
    setCurrentPlayerId(res.data.user._id);

    const playerReviewResponse = await axios.post(
      `${baseUrl}/api/v1/review/get-overall-review`,
      { page: page }
    );
    console.log(playerReviewResponse);

    if (playerReviewResponse.data.success) {
      const reviews = playerReviewResponse.data.data.review;
      // Sort reviews by creation date in descending order
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // Slice the array to get the latest 20 reviews
      const latestReviews = reviews.slice(0, 20);

      setCurrentPlayerReviews(latestReviews);
      setTotal(playerReviewResponse.data.data.totalReview);
      setLimits(playerReviewResponse.data.data.limit);

      console.log("Current player Review", latestReviews);
    }
  } catch (error) {
    message.error("Error inside the Get currentUserData function");
  }
};

  useEffect(() => {
    currentUserData(currentPage);
  }, [currentPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const combineTable = [...currentPlayerReviews, reviewGivenCoachName];

  useEffect(() => {
    currentUserData();
  }, []);

  // Filter sampleData based on userRole and Userlocation
  const handleCoachNameSearch = async (value) => {
    console.log("Coach Name Searched: ", value);
    const filteredReviews = currentPlayerReviews.filter((review) =>
      review.reviewGivenCoachName.toLowerCase().includes(value.toLowerCase())
    );
    setReviews(filteredReviews);

    try {
      const searchResponse = await axios.post(
        `${baseUrl}/api/v1/review/search-review`,
        { coachName: value }
      );
      console.log(searchResponse);

      if (searchResponse.data.success) {
        message.success(searchResponse.data.message);
        setCurrentPlayerReviews(searchResponse.data.data);
      }
    } catch (error) {
      message.error("Error inside the handleCoachNameSearch function");
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
            <div className="search">
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%", marginBottom: "8px" }}
              >
                <Input.Search
                  placeholder="Search Coach Name..."
                  style={{ flex: 1 }}
                  onSearch={handleCoachNameSearch}
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
                    title: "Coach Name",
                    dataIndex: "coachName",
                    key: "coachName",
                    render: (text, record) => (
                      <span>{record.reviewGivenCoachName}</span>
                    ),
                  },

                  {
                    title: "Coach Email",
                    dataIndex: "coachEmail",
                    key: "coachEmail",
                    render: (text, record) => (
                      <span>{record.reviewGivenCoachEmail}</span>
                    ),
                  },

                  {
                    title: "Rating",
                    dataIndex: "rating",
                    key: "rating",
                    render: (text, record) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Rate disabled defaultValue={record.overallReview} />
                        <span
                          style={{ marginLeft: "25px" }}
                        >{`${record.overallReview} / 5.0`}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Comment",
                    dataIndex: "comment",
                    key: "comment",
                    render: (text, record) => (
                      <span>{record.comment || "No Comment"}</span>
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
                dataSource={currentPlayerReviews}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
};

export default PlayerReviews;
