// Importing necessary libraries and components
import "./AdminStats.css";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import SideBar from "../DashboardSideBar/SideBar.jsx";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import baseUrl from "../../baseUrl/baseUrl";

import { Layout, Col, Statistic } from "antd";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const AdminStats = () => {
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
        <div className="Stats flex-container">
          <div className="dataCard revenueCard">
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
          <div className="dataCard customerCard">
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
        </div>
      </Layout>
    </SideBar>
  );
};

// Exporting the Navbar component
export default AdminStats;
