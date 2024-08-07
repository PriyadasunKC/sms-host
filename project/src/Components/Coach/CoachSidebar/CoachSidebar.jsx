// Importing necessary libraries and components
import "./CoachSidebar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Profile } from "../../icons/Profile.svg";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  FormOutlined,
  EditOutlined,
  CalendarOutlined,
  MailOutlined,
} from "@ant-design/icons";
import baseUrl from "../../baseUrl/baseUrl";

import {
  Layout,
  Menu,
  Button,
  Avatar,
  message,
} from "antd";
import axios from "axios";

const { Header, Sider } = Layout;



const CoachSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isHoveredButton1, setIsHoveredButton1] = useState(false);
  const [isHoveredButton2, setIsHoveredButton2] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const location = useLocation();
  const [currentUserName, setCurrentUsername] = useState();
  const [currentCoachId, setCurrentCoachId] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [positionNotification, setPositionNotification] = useState();
  const [isCoach, setIsCoach] = useState(false);
  const navigate = useNavigate();

  // Helper function to check if the current URL matches a specific path
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Custom Function to Check Query Parameter
  const hasQueryParam = (queryParam, queryValue) => {
    const { search } = location;
    const url = new URLSearchParams(search);
    const paramValue = url.get(queryParam);
    return paramValue === queryValue; 
  };

  // Event handlers for mouse hover events
  const handleHoverButton1 = () => {
    setIsHoveredButton1(true);
  };

  const handleMouseLeaveButton1 = () => {
    setIsHoveredButton1(false);
  };

  const handleHoverButton2 = () => {
    setIsHoveredButton2(true);
  };

  const handleMouseLeaveButton2 = () => {
    setIsHoveredButton2(false);
  };

  // Event handler for menu item click
  const handleMenuItemClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  // Functional component to display text based on selected menu item
  const Text = ({ selectedMenuItem }) => {
    const text = {
      "/coach-stats": "Dashboard",
      "/coach-availability": "My Availability",
      "/coach-review-players": "Review Players",
      "/coach-profile": "My Profile",
      "/create-team": "Create Team",
      "/edit-team": "Edit Team",
      "/select-players": "Select players for the team",
      "/update-team": "Update the team details and players",
      "/coach-to-eo-communication": "Mail To Organizer",
      "/apply-position": "Apply Position",
    };

    return <p>{text[selectedMenuItem]}</p>;
  };

  //GET CURRENT USER DATA
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

      setIsCoach(res.data.user.isCoach);
      setCurrentUsername(res.data.user.username);
      setCurrentCoachId(res.data.user._id);
    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };

  // URL for the profile avatar
  const url =
    "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png";

  // Event handler for trigger button click
  const handleTriggerButtonClick = () => {
    setCollapsed(!collapsed);
  };

  // Get Database from the backend using Axios
  const [userData, setUserData] = useState({
    avatarUrl:
      "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png",
    username: "John Doe",
  });

  useEffect(() => {
    //  call getCurrentUser function
    currentUserData();

    // Replace 'your_backend_api/user_data' with your actual API endpoint for fetching user data
    axios
      .get(`${baseUrl}/demo`)
      .then((response) => {
        const data = response.data;
        setUserData({
          avatarUrl: data.avatarUrl,
          username: data.username,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleLogOut = async () => {
    try {
      localStorage.clear();
      window.location.reload();

      message.success("Logout Successfully");
    } catch (error) {
      message.error("Logout failed");
    }
  };

  return (
    <Layout className="ant-layout-sider-children">
      {/* Sidebar component */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={100}
        className={collapsed ? "collapsed" : ""}
      >
        {/* Profile section */}
        <div style={{ backgroundColor: "#15295E" }} className="profile">
          {collapsed ? (
            <Avatar
              className="profileAvatar"
              src={<img src={userData.avatarUrl} alt="avatar" />}
            />
          ) : (
            <>
              <Avatar
                className="profileAvatar"
                src={<img src={url} alt="avatar" />}
              />
              <div style={{ color: "white" }} className="Username">
                {currentUserName}
              </div>
            </>
          )}
        </div>

        {/* Other sections of the sidebar, such as menu items */}
        <div style={{ color: "white" }} className="welcome">
          Welcome
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={handleMenuItemClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/eo-stats"]}
          style={{
            backgroundColor: "#15295E",
            fontSize: "16px",
            height: "82vh",
          }}
        >
          <Menu.Item
            key="/coach-stats"
            icon={<DashboardOutlined />}
            className={
              isPathActive("/coach-stats") ? "ant-menu-item-selected" : ""
            }
          >
            <NavLink to="/coach-stats">Dashboard</NavLink>
          </Menu.Item>

          {isCoach ? (
            <>
              <Menu.Item
                key="/coach-availability"
                icon={<EditOutlined />}
                className={
                  isPathActive("/coach-availability")
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <NavLink to="/coach-availability">
                  <span className="nav-text">My Availability</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item
                key={`/create-team-${currentCoachId}`} // Unique key
                icon={<EditOutlined />}
                className={
                  hasQueryParam("coach_id", currentCoachId) &&
                  location.pathname.includes("/create-team") 
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <NavLink
                  to={`/create-team?coach_id=${currentCoachId}`}
                  onClick={() =>
                    navigate(`/create-team?coach_id=${currentCoachId}`)
                  }
                >
                  <span className="nav-text">Create Team</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item
                key={`/edit-team-${currentCoachId}`} // Unique key
                icon={<FormOutlined />}
                className={
                  hasQueryParam("coach_id", currentCoachId) &&
                  location.pathname.includes("/edit-team") 
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <NavLink
                  to={`/edit-team?coach_id=${currentCoachId}`}
                  onClick={() =>
                    navigate(`/edit-team?coach_id=${currentCoachId}`)
                  }
                >
                  <span className="nav-text">Edit Team</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="/coach-review-players"
                icon={<CalendarOutlined />}
                className={
                  isPathActive("/coach-review-players")
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <NavLink to="/coach-review-players">
                  <span className="nav-text">Review Players</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="/coach-profile"
                icon={<Profile />}
                className={
                  isPathActive("/coach-profile") ? "ant-menu-item-selected" : ""
                }
              >
                <NavLink to="/coach-profile">
                  <span className="nav-text">My Profile</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="/coach-to-eo-communication"
                icon={<MailOutlined />}
                className={
                  isPathActive("/coach-to-eo-communication")
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <NavLink to="/coach-to-eo-communication">
                  <span className="nav-text">Mail To Organizer</span>
                </NavLink>
              </Menu.Item>
            </>
          ) : (
            <div style={{ paddingLeft: "20px" }}>
              <Menu.Item
                key="/apply-position"
                icon={<Profile />}
                className={
                  isPathActive("/apply-position")
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <NavLink to="/apply-position">Apply Position</NavLink>
              </Menu.Item>
            </div>
          )}

          <Menu.Item
            key="logoff"
            icon={<PoweroffOutlined />}
            onMouseEnter={handleHoverButton1}
            onMouseLeave={handleMouseLeaveButton1}
            className={isPathActive("logoff") ? "ant-menu-item-selected" : ""}
          >
            <NavLink onClick={handleLogOut}>Log Off</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main content layout */}
      <Layout>
        {/* Header component */}
        <Header className="ant-layout-header">
          {/* Trigger button */}
          <Button
            className="trigger-button ant-btn"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleTriggerButtonClick}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              backgroundColor: isHoveredButton2 ? "#526CAE" : "#15295E",
              color: isHoveredButton2 ? "white" : "white",
            }}
            onMouseEnter={handleHoverButton2}
            onMouseLeave={handleMouseLeaveButton2}
          />
          {/* Title and notification sections */}
          <span
            className="title"
            style={{
              color: "white",
              marginLeft: "75px",
              letterSpacing: "1px",
              fontSize: "22px",
              fontWeight: "regular",
            }}
          >
            GameSync Pro - Coach
          </span>
        </Header>

        {/* Title bar displaying the selected menu item */}
        <div
          className="title_bar"
          style={{ color: "white", backgroundColor: "#1D5596" }}
        >
          <Text className="menuTitle" selectedMenuItem={location.pathname} />
        </div>
        {/* Main content */}
        {children}
      </Layout>
    </Layout>
  );
};

export default CoachSidebar;
