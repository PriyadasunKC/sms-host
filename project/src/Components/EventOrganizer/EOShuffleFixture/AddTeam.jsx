import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import SideBar from "../EOSideBar/EOSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../baseUrl/baseUrl";
const AddTeam = () => {
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const teamName = values.teamName;
    console.log(teamName);
    const respose = await axios.post(`${baseUrl}/api/v1/fixture/team`, {
      teamName: teamName,
    });

    console.log(respose);
    navigate("/fixture");
  };

  return (
    <>
      <SideBar>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="TeamName"
            name="teamName"
            rules={[
              {
                required: true,
                message: "Please input your TeamName!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </SideBar>
    </>
  );
};
export default AddTeam;
