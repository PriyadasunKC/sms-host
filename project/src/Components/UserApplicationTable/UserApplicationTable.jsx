// Importing necessary libraries and components
import "./UserApplicationTable.css";
import React, { useState, useEffect } from "react";
import SideBar from "../DashboardSideBar/SideBar";
import baseUrl from "../baseUrl/baseUrl";
import { Layout, Button, Input, Table, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const UserApplicationTable = () => {

  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/admin/pagination`, {
        page,
      });
      console.log("response", response);
      setUserApplicationData(response.data.data.players);
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

  // get current applying user data
  const ApplyingUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/admin/get-all-details`);

      if (res.data.success) {
      } else {
        message("Error found in applying details section");
      }
    } catch (error) {
      message.error("Error while fetching data");
    }
  };

  const NavigateDetailsPage = async (record) => {
    navigate("/Applying-Details", { state: { record: record } });
  };

  // handle delete
  const handleDelete = async (record) => {
    console.log(record.Email);

    try {
      const deletedUser = await axios.delete(
        `${baseUrl}/api/v1/admin/delete-details`,
        {
          data: { deletedUserId: record._id, email: record.Email },
        }
      );

      if (deletedUser.data.success) {
        message.success(deletedUser.data.message);
        window.location.reload();
        navigate("/UserValidation");
      }
    } catch (error) {
      message.error("Error while occuring handle delete section");
    }
  };

  // handle remove
  const handleRemove = async (record) => {
    console.log(record.Email);

    try {
      const deletedUser = await axios.delete(
        `${baseUrl}/api/v1/admin/remove-details`,
        {
          data: { deletedUserId: record._id, email: record.Email },
        }
      );

      if (deletedUser.data.success) {
        message.success(deletedUser.data.message);
        window.location.reload();
        navigate("/UserValidation");
      }
    } catch (error) {
      message.error("Error while occuring handle delete section");
    }
  };

  useEffect(() => {
    ApplyingUser();
  }, []);

  // Filter userApplicationData based on userRole and Userlocation
  const filteredData = userApplicationData.filter((data) => {
    return (
      data.UserRole &&
      data.UserRole.toLowerCase().includes(userRole) &&
      data.Distric &&
      data.Distric.toLowerCase().includes(Userlocation)
    );
  });

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
              padding: 0,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            {/* Search section */}
            <div className="search">
              <Input.Search
                placeholder="Search User Roll..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setUserRole(value)}
                onChange={(e) => setUserRole(e.target.value)}
              />
              <Input.Search
                placeholder="Search District..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setUserLocation(value)}
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "User Role",
                    dataIndex: "uid",
                    render: (text, record) => <span>{record.UserRole}</span>,
                  },

                  {
                    title: "User Full Name",
                    dataIndex: "userName",
                    key: "userName",
                    render: (text, record) => (
                      <span>{record.FirstName + " " + record.LastName}</span>
                    ),
                  },

                  {
                    title: "Experience",
                    dataIndex: "Experience",
                    key: "Experience",
                    render: (text, record) => <span>{record.Experience}</span>,
                  },

                  {
                    title: "Distric",
                    dataIndex: "Distric",
                    key: "Distric",
                    render: (text, record) => <span>{record.Distric}</span>,
                  },

                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (text, record) => <span>{record.status}</span>,
                  },

                  {
                    title: "Actions",
                    dataIndex: "Actions",
                    key: "Actions",
                    render: (text, record) => (
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        {record.status == "pending" ? (
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#05AD1B",
                              color: "#fff",
                              fontSize: "14px",
                              marginRight: "10px",
                              borderRadius: "5px",
                              marginTop: "auto",
                              marginBottom: "auto",
                              width: "70px",
                            }}
                            onClick={() => NavigateDetailsPage(record)}
                          >
                            View
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#E4A11B",
                              color: "#fff",
                              fontSize: "14px",
                              marginRight: "10px",
                              borderRadius: "5px",
                              marginTop: "auto",
                              marginBottom: "auto",
                              width: "70px",
                            }}
                            onClick={() => NavigateDetailsPage(record)}
                          >
                            Update
                          </Button>
                        )}

                        {record.status == "pending" ? (
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#D94D34",
                              color: "#fff",
                              fontSize: "14px",
                              borderRadius: "5px",
                              marginTop: "auto",
                              marginBottom: "auto",
                              width: "80px",
                            }}
                            onClick={() => handleDelete(record)}
                          >
                            Delete
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#D94D34",
                              color: "#fff",
                              fontSize: "14px",
                              borderRadius: "5px",
                              marginTop: "auto",
                              marginBottom: "auto",
                              width: "80px",
                            }}
                            onClick={() => handleRemove(record)}
                          >
                            Remove
                          </Button>
                        )}
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
                dataSource={filteredData}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </SideBar>
  );
};

export default UserApplicationTable;
