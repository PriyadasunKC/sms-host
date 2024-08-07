import React, { useState } from "react";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Form, Input, message } from "antd"; 
import { CloseSquareOutlined } from "@ant-design/icons";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";
const { TextArea } = Input;

const CoachToEOCommunicationForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [to_name, setTo_name] = useState("");
  const [to_email, setTo_email] = useState("");
  const [subject, setSubject] = useState("");
  const [userMessage, setUserMessage] = useState(""); 
  const [userData, setUserData] = useState([]);
  const location = useLocation()

  console.log(location);

  const onFinish = async (values) => {
    setIsLoading(true);
    console.log("Success:", values);

    try {
      // Replace these with your actual email service configuration
      const serviceId = "service_m4qpw4q";
      const templateId = "template_dfew19x"; // Your template ID
      const userId = "frDtBGCCD-GOcxv7E"; // Your user ID

      // Construct the email message using the template
      await emailjs
        .send(
          serviceId,
          templateId,
          {
            to_name: to_name,
            to_email: to_email, 
            from_name: "Coach",
            subject: subject, 
            message: userMessage, 
          },
          userId
        )
        .then((response) => {
          console.log("Email sent successfully:", response);
          // Use message.success from Ant Design
          message.success("Email sent successfully!");
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          // Use message.error from Ant Design
          message.error("Failed to send email.Please Use Verify Email Address !");
        });
    } catch (error) {
      console.error("Error sending email:", error);
      // Use message.error from Ant Design
      message.error("Failed to send email.Please Use Verify Email Address !");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToNameChange = (e) => {
    setTo_name(e.target.value);
  };

  const handleToEmailChange = (e) => {
    setTo_email(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  return (
    <CoachSidebar>
      <Form
        form={form}
        style={{ margin: "auto", width: "75%" }}
        layout="vertical"
        onFinish={onFinish}
      >
        <div style={{}} className="CreateEventForm">
          <div
            style={{ backgroundColor: "#15295E" }}
            className="CreateEventFormHeader"
          >
            <h3
              style={{
                color: "white",
                letterSpacing: "1px",
                fontWeight: "500",
              }}
            >
              New Message
            </h3>
            <a href="/coach-to-eo-communication">
              <CloseSquareOutlined
                style={{
                  color: "white",
                  fontSize: "20px",
                  marginRight: "10%",
                }}
              />
            </a>
          </div>

          <div
            style={{ backgroundColor: "white", padding: "50px" }}
            className="CreateEventFormApplication"
          >
            <div className="InputData">
              <div className="DataIem">
                <label htmlFor="to_name">To Name:</label>
                <div style={{ flex: 10 }}>
                  <Input
                    type="text"
                    id="to_name"
                    required
                    name="to_name"
                    value={location.state.record.username}
                    // onChange={handleToNameChange}
                  />
                </div>
              </div>
              <div className="DataIem">
                <label htmlFor="to_email">To:</label>
                <div style={{ flex: 10 }}>
                  <Input
                    type="email"
                    id="to"
                    required
                    name="to"
                    value={to_email}
                    onChange={handleToEmailChange}
                  />
                </div>
              </div>
              <div className="DataIem">
                <label htmlFor="subject">Subject:</label>
                <div style={{ flex: 10 }}>
                  <Input
                    type="text"
                    id="subject"
                    required
                    name="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                  />
                </div>
              </div>
              <div className="DataIem">
                <label htmlFor="message">Message:</label>
                <div style={{ flex: 10 }}>
                  <TextArea
                    id="message"
                    required
                    name="message"
                    rows={5}
                    placeholder="Enter your message here..."
                    value={userMessage} // Use userMessage state variable
                    onChange={handleUserMessageChange}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your message.",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="buttonSet">
                <div>
                  <button
                    className="CreateEventBTn"
                    style={{ backgroundColor: "#52c41a" }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </CoachSidebar>
  );
};

export default CoachToEOCommunicationForm;
