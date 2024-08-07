import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";

const UpcomingEvents = () => {
  const [refereeId, setRefereeId] = useState("");
  const [assignEvents, setAssignEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const currentUserData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/user/getCurrentUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRefereeId(res.data.user._id);
    } catch (error) {
      message.error("Error fetching current user data");
    }
  };

  const getAssignMatches = async (refereeId, page) => {
    try {
      const assignMatchResponse = await axios.post(
        `${baseUrl}/api/v1/event/assignReferee-event`,
        {
          refereeId,
          page,
        }
      );
      const events = assignMatchResponse.data.data.data;
      // Sort events by date in descending order
      events.sort(
        (a, b) => new Date(b.eventNewDate) - new Date(a.eventNewDate)
      );
      // Slice the first 10 elements
      const latestEvents = events.slice(0, 10);
      setAssignEvents(latestEvents);
    } catch (error) {
      message.error("Failed to get assigned matches");
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  useEffect(() => {
    if (refereeId) {
      getAssignMatches(refereeId, currentPage);
    }
  }, [refereeId, currentPage]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    { dataIndex: "nameOfTheEvent", key: "nameOfTheEvent", title: "Event Name" },
    { dataIndex: "location", key: "location", title: "Location" }

  ];

  return (
    <Table
      dataSource={assignEvents}
      columns={columns}
      pagination={false}
      showHeader={false}
    />
  );
};

export default UpcomingEvents;
