// Importing necessary libraries and components
import "./EOEditEvent.css";
import React, { useState, useEffect } from "react";
import SideBar from "../EOSideBar/EOSideBar";
import baseUrl from "../../baseUrl/baseUrl";
import { Layout, Button, Input, Table, message, DatePicker } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const EOEditEvent = () => {
 
  const initialDataSource = [
    {
      key: "1",
      eid: "E001",
      eventName: "Event 1",
      eventDate: "2022-01-01",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "2",
      eid: "E002",
      eventName: "Event 2",
      eventDate: "2022-02-01",
      location: "Los Angeles",
      actions: "N/A",
    },
    {
      key: "3",
      eid: "E003",
      eventName: "Event 3",
      eventDate: "2022-03-01",
      location: "Chicago",
      actions: "N/A",
    },
   
  ];

  const [eventName, setEventName] = useState();
  const [EventLocation, setEventLocation] = useState();
  const [EventDate, setEventDate] = useState();
  const [dataSource, setDataSource] = useState(initialDataSource);
  const navigate = useNavigate();
  const [createdEvent, setCreatedEvent] = useState([]);

  // GET ALL CREATED DATA || GET
  const getAllCreatedEventData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/event/get-all-events`
      );
      console.log(response);

      if (response.data.success) {
        message.success(response.data.message);
        setCreatedEvent(response.data.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
useEffect(() => {
  getAllCreatedEventData();
}, []);

// console the value to search name of the event
const handleEventNameSearch = (value) => {
  console.log("Event Name Searched: ", value);
};

// console the value to search location of the event
const handleEventLocationSearch = (value) => {
  console.log("Event Location Searched: ", value);
};

// console the value to search date of the event
const handleDateChange = (date, dateString) => {
  console.log("Event Date Selected: ", dateString);
};

  return (
    <SideBar>
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
              <Input.Search
                placeholder="Search Event Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={handleEventNameSearch}
                allowClear
              />
              <Input.Search
                placeholder="Search Event Location..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={handleEventLocationSearch}
                allowClear
              />

              <DatePicker
                style={{ marginBottom: "8px", width: "100%", height: "32px" }}
                onChange={handleDateChange}
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "E_ID",
                    dataIndex: "eid",
                    key: "eid",
                    render: (text, record) => <span>{record._id}</span>,
                  },

                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                    render: (text, record) => (
                      <span>{record.nameOfTheEvent}</span>
                    ),
                  },

                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
                  },

                  {
                    title: "Location",
                    dataIndex: "location",
                    key: "location",
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
                          href="/eo-edit-event-form"
                          style={{
                            backgroundColor: "#52c41a",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "80px",
                          }}
                          
                        >
                          View
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#f5222d",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "80px",
                          }}
                        >
                          Delete
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                dataSource={createdEvent}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </SideBar>
  );
};

export default EOEditEvent;
