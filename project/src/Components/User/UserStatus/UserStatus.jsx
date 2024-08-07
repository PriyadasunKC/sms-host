// Importing necessary libraries and components
import "./UserStatus.css";
import React, { useEffect } from "react";
import CountUp from "react-countup";
import SideBar from "../DashboardSideBar/SideBar.jsx";
import { Layout } from "antd";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Clock } from "@sujitsimon/react-flipclock";
import Calendar from "react-calendar";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";

const { Content } = Layout;

// Navbar component
const UserStatus = () => {
  // Formatter function for CountUp component
  const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(() => {
    // Replace 'your_backend_api/user_data' with your actual API endpoint for fetching user data
    axios
      .get(`${baseUrl}/demo`)
      .then((response) => {
        const data = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // JSX structure for the Navbar component
  return (
    <SideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <div className="Stats flex-container">
            <div className="dataCard flex-container1st ">
              <div className="flex-item1st">
                <h3>Date</h3>
                <Calendar className="my-calendar" />
              </div>
              <div className="flex-item1st">
                <h3>Time</h3>
                <Clock
                  config={{
                    height: "48px",
                    backgroundColor: "#241623",
                    textColor: "#fff",
                  }}
                />
              </div>
            </div>
            <div className="dataCard PositionCard">
              <Bar
                data={{
                  labels: ["Requested", "Approved", "Pending", "Deleted"],
                  datasets: [
                    {
                      label: "Number of Positions",
                      data: [150, 100, 75, 50],
                      backgroundColor: ["red", "blue", "green", "orange"],
                    },
                  ],
                }}
              />
            </div>
            <div className="dataCard categoryCard">
              <Doughnut
                data={{
                  labels: [
                    "Event Organizers",
                    "Players",
                    "Team Managers",
                    "Coaches",
                    "Referees",
                  ],
                  datasets: [
                    {
                      data: [10, 20, 30, 25, 15],
                      backgroundColor: [
                        "red",
                        "blue",
                        "green",
                        "yellow",
                        "purple",
                      ],
                    },
                  ],
                }}
              />
            </div>
            <div className="dataCard categoryCard">
              <Line
                className="chart"
                data={{
                  labels: ["January", "February", "March", "April"],
                  datasets: [
                    {
                      label: "Created Events",
                      data: [10, 20, 15, 35],
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "Cancelled Events",
                      data: [5, 10, 5, 26],
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "Delayed Events",
                      data: [7, 14, 21, 28],
                      borderColor: "blue",
                      fill: false,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Layout>
      </Layout>
    </SideBar>
  );
};

export default UserStatus;
