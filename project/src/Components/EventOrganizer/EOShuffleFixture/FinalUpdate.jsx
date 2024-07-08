import React, { useEffect, useState } from "react";
import SideBar from "../EOSideBar/EOSideBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Table, message, Checkbox } from "antd";
import baseUrl from "../../baseUrl/baseUrl";

export default function FinalUpdate() {
  const location = useLocation();
  const [currentfixture, setcurrentFixture] = useState([]);

  const currentFixture = async () => {
    try {
      const id = location.state.id;
      const response = await axios.get(`${baseUrl}/api/v1/fixture/get-team`);
      setcurrentFixture(response.data.data);
    } catch (error) {
      message.error("Current Fixture Fetch have an error");
    }
  };

  useEffect(() => {
    currentFixture();
  });

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.post(`${baseUrl}/api/v1/delete/delte-team`, {
        id: id,
      });
      console.log(response);
      message.success(response.data.message);
    } catch (error) {
      message.error("Delete Fixture have an error");
    }
  };

  return (
    <>
      <SideBar>
        <div className="fixtureContainer">
          <Table
            className="Table"
            columns={[
              {
                title: "Teams Name",
                dataIndex: "teamName",

                render: (text, record) => (
                  <>
                    <span>{record.TeamName}</span>
                  </>
                ),
              },

              {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                  <>
                    <Checkbox onClick={() => handleDelete(record._id)}>
                      Delete
                    </Checkbox>
                  </>
                ),
              },
            ]}
            pagination={{
              style: {
                marginTop: "50px",
              },
              pageSize: 100,
            }}
            dataSource={currentfixture}
          ></Table>
        </div>
      </SideBar>
    </>
  );
}
