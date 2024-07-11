import React, { useState } from "react";
import EOSidebar from "../EOSideBar/EOSideBar";
import './EditEventFormNew.css'
import { Form, Input, DatePicker, TimePicker, message } from "antd";
import {
  CloseSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../baseUrl/baseUrl";

const EOEditEventForm = () => {
  const [nameOfTheEvent, setEventName] = useState("");
  const [numberOfTeams, setNoOfTeams] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const eventLocation = useLocation()
  const navigate = useNavigate()
  console.log(eventLocation);


  const handleCreate = async () => {

  };


  const editEventData = async () => {
    // get date
    const date = new Date(eventDate.$d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const eventNewDate = `${day}-${month}-${year}`;


    // get time
    const time = new Date(startingTime.$d);
    const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const eventId = eventLocation.state.record._id

    console.log(nameOfTheEvent,numberOfTeams,location,eventNewDate,formattedTime,eventId);

    try {
      const response = await axios.post(`${baseUrl}/api/v1/EditEventTable/update-event`,{nameOfTheEvent:nameOfTheEvent,numberOfTeams:numberOfTeams,location:location,eventNewDate:eventNewDate,formattedTime:formattedTime,eventId:eventId})
      console.log(response);

      if(response.data.success){
        message.success('Event Updated Successfully')
        navigate("/EditEventTable")
      }

    } catch (error) {
      console.log('Error updating data:', error);
    }
  }

  return (
    <div>
      <EOSidebar>
        <Form
          style={{
            margin: "auto",
            width: "75%",
          }}
          layout="verticle"
        >
          <div style={{}} className="CreateEventForm">
            <div
              style={{
                backgroundColor: "#15295E",
              }}
              className="CreateEventFormHeader"
            >
              <h3
                style={{
                  color: "white",
                  letterSpacing: "1px",
                  fontWeight: "500",
                }}
              >
                Edit Event
              </h3>
              <a href="/EditEventTable">
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
              style={{
                backgroundColor: "white",
                padding: "50px",
              }}
              className="CreateEventFormApplication"
            >
              <div className="InputData">
                <div className="DataIem">
                  <label htmlFor="eventName">Name of the Event:</label>
                  <Input
                    type="text"
                    id="eventName"
                    required
                    name="eventName"
                    placeholder={eventLocation.state.record.nameOfTheEvent}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="location">Location:</label>
                  <Input
                    type="text"
                    id="location"
                    required
                    name="location"
                    placeholder={eventLocation.state.record.location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <Input
                    type="number"
                    id="numberOfTeams"
                    name="numberOfTeams"
                    placeholder={eventLocation.state.record.numberOfTeams}
                    onChange={(e) => setNoOfTeams(e.target.value)}
                    required
                  />
                </div>
                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker
                    id="EventDate"
                    name="EventDate"
                    placeholder={eventLocation.state.record.eventNewDate}
                    onChange={(date) => setEventDate(date)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker
                    id="startingTime"
                    name="startingTime"
                    placeholder={eventLocation.state.record.formattedTime}
                    onChange={(time) => setStartingTime(time)}
                  />
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#05AD1B", width: "80pxx" }}
                      onClick={editEventData}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Edit Event
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </EOSidebar>
    </div>
  );
};

export default EOEditEventForm;