import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";

const UpcomingEvents = () => {
  const [createEvent, setCreateEvent] = useState([]);

  // GET ALL CREATE EVENT
  const getAllCreateEvent = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/event/get-all-events`
      );

      if (response.data.success) {
        const events = response.data.data;
        // Sort events by createdAt timestamp in descending order
        events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Slice the first 8 elements
        const latestEvents = events.slice(0, 8);
        setCreateEvent(latestEvents); // Update the state with the latest 8 events
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllCreateEvent(); 
  }, []);

  const columns = [
    { dataIndex: "nameOfTheEvent", key: "nameOfTheEvent", title: "Event" },
    { dataIndex: "location", key: "location", title: "Location" },
  ];

  return (
    <Table
      dataSource={createEvent}
      columns={columns}
      pagination={false}
      showHeader={false} // Show the header
    />
  );
};

export default UpcomingEvents;
