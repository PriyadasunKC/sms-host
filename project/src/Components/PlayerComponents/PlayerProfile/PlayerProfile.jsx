import { React, useEffect, useState } from "react";
import "./PlayerProfile.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Upload, Modal, Input, Button, DatePicker, message } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import moment from "moment";
import baseUrl from "../../baseUrl/baseUrl";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PlayerProfile = () => {
  const [previewVisibleProfile, setPreviewVisibleProfile] = useState(false);
  const [previewImageProfile, setPreviewImageProfile] = useState("");
  const [fileListProfile, setFileListProfile] = useState([]);
  const [fileListCover, setFileListCover] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [playerDateOfBirth, setPlayerDateOfBirth] = useState("");
  const [playerAge, setPlayerAge] = useState(0);
  const [playerId, setPlayerId] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [ageError, setAgeError] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/user/getCurrentUser`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPlayerId(res.data.user._id);
      } catch (error) {
        message.error("Error fetching current user data");
      }
    };

    fetchCurrentUser();
  }, []);

  const handlePlayerNameChange = (e) => {
    const name = e.target.value;
    setPlayerName(name);
    setNameError(name.trim() === "");
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setPlayerEmail(email);
    setEmailError(
      email.trim() === ""
        ? "Email cannot be empty"
        : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ? "Invalid email format"
        : ""
    );
  };

  const handleDateChange = (date, dateString) => {
    setPlayerDateOfBirth(dateString);
    setDateError(dateString === "");
  };

  const handleAgeChange = (value) => {
    const age = value;
    setPlayerAge(age);
    setAgeError(
      !age
        ? "Age cannot be empty"
        : age < 16 || age > 70
        ? "Invalid age. Age should be between 16 and 70"
        : ""
    );
  };

  const handleFormSubmit = async (index) => {
    if (!playerName || !playerEmail || !playerDateOfBirth || !playerAge) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 30000);

    try {
      if (fileListProfile.length > 0) {
        const profileImage = fileListProfile[0].originFileObj;
        const profileImageFormData = new FormData();
        profileImageFormData.append("image", profileImage);
        profileImageFormData.append("playerId", playerId);

        const profileImageResponse = await axios.post(
          `${baseUrl}/api/v1/profile/player-profile-image-upload`,
          profileImageFormData
        );

        if (profileImageResponse.data.success) {
          message.success(profileImageResponse.data.message);
        } else {
          message.error("Profile image upload failed");
        }
      }

      if (fileListCover.length > 0) {
        const coverImage = fileListCover[0].originFileObj;
        const coverImageFormData = new FormData();
        coverImageFormData.append("coverImage", coverImage);
        coverImageFormData.append("playerId", playerId);

        const coverImageResponse = await axios.post(
          `${baseUrl}/api/v1/profile/player-cover-image-upload`,
          coverImageFormData
        );

        if (coverImageResponse.data.success) {
          message.success("Cover image upload successful");
        } else {
          message.error("Cover image upload failed");
        }
      }

      const playerProfileResponse = await axios.post(
        `${baseUrl}/api/v1/profile/player-profile`,
        {
          playerId,
          playerName,
          playerEmail,
          playerDateOfBirth,
          playerAge,
        }
      );

      if (playerProfileResponse.data.success) {
        message.success(playerProfileResponse.data.message);
        window.location.reload();
      } else {
        message.error("Profile update failed");
      }
    } catch (error) {
      message.error("Error occurred while submitting the form");
    }
  };

  const onChangeProfile = ({ fileList: newFileList }) => {
    setFileListProfile(newFileList);
  };

  const onPreviewProfile = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImageProfile(src);
    setPreviewVisibleProfile(true);
  };

  const onChangeCover = ({ fileList: newFileList }) => {
    setFileListCover(newFileList);
  };

  const onPreviewCover = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };
  return (
    <div>
      <PlayerSideBar>
        <div className="player-profile">
          <div className="ProfileHeader">
            <h3>My Profile</h3>
          </div>
          <div
            className="coachProfile"
            style={{ overflowX: "auto", height: "65vh" }}
          >
            <form className="playerProfileForm">
              <label className="formLabel">
                Name:
                <div>
                  <Input
                    type="text"
                    name="name"
                    className="inputBox"
                    onChange={handlePlayerNameChange}
                    allowClear
                  />
                  {nameError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      Name cannot be empty
                    </div>
                  )}
                </div>
              </label>

              <label className="formLabel">
                Email:
                <div>
                  <Input
                    type="email"
                    name="email"
                    className={`inputBox ${emailError ? "error" : ""}`}
                    onChange={handleEmailChange}
                    allowClear
                  />
                  {emailError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      {emailError}
                    </div>
                  )}
                </div>
              </label>

              <div className="AgeSection">
                <div>
                  <label className="formLabel">Date of Birth:</label>
                  <div>
                    <DatePicker
                      style={{
                        width: "400%",
                      }}
                      onChange={handleDateChange}
                      disabledDate={(current) => {
                        // Can not select days before today and today
                        return (
                          current &&
                          (current <
                            moment().endOf("day").subtract(35, "years") ||
                            current >
                              moment().endOf("day").subtract(16, "years"))
                        );
                      }}
                    />
                    {dateError && (
                      <div
                        className="errorText"
                        style={{
                          fontSize: "13px",
                          color: "red",
                          width: "150%",
                        }}
                      >
                        Date cannot be empty
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="formLabel">Age:</label>
                  <input
                    type="number"
                    onChange={(e) => handleAgeChange(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  {ageError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      {ageError}
                    </div>
                  )}
                </div>
              </div>
              <div className="ImageUploading">
                <div>
                  <label className="formLabel">Profile Image:</label>
                  <Modal
                    visible={previewVisibleProfile}
                    footer={null}
                    onCancel={() => setPreviewVisibleProfile(false)}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImageProfile}
                    />
                  </Modal>
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileListProfile} 
                      onChange={onChangeProfile}
                      onPreview={onPreviewProfile}
                    >
                      {fileListProfile.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>

                <div>
                  <label className="formLabel">
                    Upload Medical Report Image:
                  </label>
                  <Modal footer={null}>
                    <img alt="example" style={{ width: "100%" }} />
                  </Modal>
                  <ImgCrop rotationSlider>
                    <Upload
                      listType="picture-card"
                      fileList={fileListCover}
                      onChange={onChangeCover}
                    >
                      {fileListCover.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>
              </div>
              <br />
              <Button
                className="submitBtn"
                loading={loadings[0]}
                type="ghost"
                onClick={() => handleFormSubmit(0)}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </PlayerSideBar>
    </div>
  );
};

export default PlayerProfile;
