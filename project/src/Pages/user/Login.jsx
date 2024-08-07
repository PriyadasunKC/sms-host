import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../Components/baseUrl/baseUrl";
const layout = {
  labelCol: {
    span: 24, // Set to full width on small screens
  },
  wrapperCol: {
    span: 24, // Set to full width on small screens
  },
};

const tailLayout = {
  wrapperCol: {
    span: 24, // Set to full width on small screens
  },
};

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${baseUrl}/api/v1/user/login`, values);

      console.log("Login successful");
      console.log(res.data);

      localStorage.setItem("email", values.email);
      localStorage.setItem("token", res.data.token);

      // check backend validation
      if (res.data.success) {
        // Redirect to the admin dashboard or another page after successful login
        navigate("/dashboad");
        message.success("Login successfull");
      } else {
        message.error("Invalid credential");
      }
    } catch (error) {
      // Handle login error (display error message, etc.)
      // console.error('Login error:', error.response.data.message);
      console.log("Login error");

      setError(error.response?.data?.message);
      message.error("Login failed. Please check your credentials.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="dash d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-md-50 w-lg-25">
        <center>
          <h2>User Log-In</h2>
        </center>
        <Form
          {...layout}
          name="loginForm"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your Email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="w-100">
              Log in
            </Button>
          </Form.Item>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <Form.Item {...tailLayout}>
            <Link
              to="/register"
              className="btn btn-primary btn-default border w-100 rounded-0"
            >
              Sign Up
            </Link>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
