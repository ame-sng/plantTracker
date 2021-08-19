import React, { useState, useEffect } from "react";
import {
  Statistic,
  Row,
  Col,
  Typography,
  Button,
  DatePicker,
  notification,
  Divider
} from "antd";
import { SmileOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import moment from "moment";
import EditWaterFreq from "../EditPlantDetails/4_EditWaterFreq";
import EditFertFreq from "../EditPlantDetails/5_EditFertFreq";
import EditProgressFreq from "../EditPlantDetails/6_EditProgressFreq";

const { Countdown } = Statistic;
const { Title } = Typography;

const CareCountdown = ({
  userStorage,
  formChanged,
  setFormChanged,
  plant,
  setWaterTime,
  setFertTime,
  setProgressTime,
}) => {
  //! RELOOK AT THE FUNCTIONALITY - USER EXPERIENCE
  const [waterVis, setWaterVis] = useState(false);
  const [fertVis, setFertVis] = useState(false);
  const [progVis, setProgVis] = useState(false);

  const [waterdeadline, setWaterDeadline] = useState(
    parseInt(moment(plant.date_started).format("x")) +
      1000 * 60 * 60 * 24 * plant.water_freq
  );
  const [fertDeadline, setFertDeadline] = useState(
    parseInt(moment(plant.date_started).format("x")) +
      1000 * 60 * 60 * 24 * plant.fertilise_freq
  );
  const [progressDeadline, setProgressDeadline] = useState(
    parseInt(moment(plant.date_started).format("x")) +
      1000 * 60 * 60 * 24 * plant.progressTrack_freq
  );

  const watered = () => {
    console.log("finished!");
    const newDate = Date.now() + 1000 * 60 * 60 * 24 * plant.water_freq;
    setWaterDeadline(newDate);
    notification.open({
      message: `${plant.name} is thirsty!`,
      description: `It's time to water ${plant.name}. Don't forget to reset the timer when you have watered it.`,
      duration: 0,
      icon: <SmileOutlined />,
    });
  };

  const fertilised = () => {
    console.log("finished!");
    setFertDeadline(Date.now() + 1000 * 60 * 60 * 24 * plant.fertilise_freq);
    notification.open({
      message: `${plant.name} needs more nutrients!`,
      description: `It's time to fertilise ${plant.name}. Don't forget to reset the timer when you have fertilised it.`,
      duration: 0,
      icon: <SmileOutlined />,
    });
  };

  const pictured = () => {
    console.log("finished!");
    setProgressDeadline(
      Date.now() + 1000 * 60 * 60 * 24 * plant.progressTrack_freq
    );
    notification.open({
      message: `Glam time for ${plant.name}!`,
      description: `It's time to take a progress shot of ${plant.name}. Don't forget to reset the timer when you have photographed it.`,
      duration: 0,
      icon: <SmileOutlined />,
    });
  };

  return (
    <div>
      {plant.water_freq ? (
          <Row 
          style={{
            padding: 5,
            marginRight: 5,
            marginBottom: 8
          }}>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={7}
              xl={7}
              style={{
                padding: 5,
                marginRight: 5,
              }}
            >
              <Row>
                <Title
                  className="rubik"
                  level={5}
                  style={{ textAlign: "center" }}
                >
                  💧 Water every
                  <span style={{ color: "#3cacfc", margin: "0 4px" }}>
                    {plant.water_freq}
                  </span>
                  days
                </Title>
                <EditOutlined
                  onClick={() => {
                    setWaterVis(true);
                  }}
                  style={{ fontSize: "18px", margin: "5px" }}
                />
                <EditWaterFreq
                  userStorage={userStorage}
                  plant={plant}
                  formChanged={formChanged}
                  setFormChanged={setFormChanged}
                  waterVis={waterVis}
                  setWaterVis={setWaterVis}
                  setWaterDeadline={setWaterDeadline}
                />
              </Row>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={12}
              lg={7}
              xl={8}
              style={{
                padding: 5,
                marginRight: 5,
              }}
            >
              <Title className="rubik" level={5}>
                Water in:
              </Title>

              <Countdown
                valueStyle={{
                  fontSize: "16px",
                  fontFamily: "'Rubik', sans-serif",
                }}
                value={waterdeadline}
                onFinish={watered}
                format="D [Days] H [hours] m [min] s [sec]"
              />
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={7}
              xl={8}
              style={{
                padding: 5,
                marginRight: 5,
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  setWaterDeadline(
                    Date.now() + 1000 * 1 * 1 * 1 * plant.water_freq
                  );
                }}
              >
                <UndoOutlined style={{color: "#fff"}}/> Reset Timer
              </Button>
            </Col>
          </Row>

      ) : (
        //*======IF WATER INFO NOT PROVIDED=======//
        <Row
        style={{
          padding: 5,
          paddingTop: 10,
          marginBottom: 8,
        }}>
          <Title className="rubik" level={4}>
            Water Frequency not provided
          </Title>
          <EditOutlined
            onClick={() => {
              setWaterVis(true);
            }}
            style={{ fontSize: "14px", margin: "5px" }}
          />
          <EditWaterFreq
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
            waterVis={waterVis}
            setWaterVis={setWaterVis}
            setWaterDeadline={setWaterDeadline}
          />
        </Row>
      )}
      <Divider />
      {plant.fertilise_freq ? (
        <Row
        style={{
          padding: 5,
          marginBottom: 8
        }}>
         <Col
              xs={24}
              sm={12}
              md={12}
              lg={7}
              xl={7}
              style={{
                padding: 5,
                marginRight: 5,
              }}>
          <Row>
            <Title 
            className="rubik"
            level={5}
            style={{ textAlign: "center" }}>
              🪴 Fertilise every  
              <span style={{ color: "#3cacfc", margin: "0 4px" }}>
                {plant.fertilise_freq}
                </span> 
                days
            </Title>
            <EditOutlined
              onClick={() => {
                setFertVis(true);
              }}
              style={{ fontSize: "14px", margin: "5px" }}
            />
            <EditFertFreq
              userStorage={userStorage}
              plant={plant}
              formChanged={formChanged}
              setFormChanged={setFormChanged}
              fertVis={fertVis}
              setFertVis={setFertVis}
              setFertDeadline={setFertDeadline}
            />
          </Row>
          </Col>

            <Col  
            xs={24}
            sm={12}
            md={12}
            lg={7}
            xl={8}
            style={{
              padding: 5,
              marginRight: 5,
              }}>
              <Title className="rubik" level={5}>
                Fertilise in
              </Title>
          
              <Countdown
                valueStyle={{
                  fontSize: "16px",
                  fontFamily: "'Rubik', sans-serif",
                }}
                value={fertDeadline}
                onFinish={fertilised}
                format="D [Days] H [hours] m [min] s [sec]"
              />
            </Col>
            <Col
             xs={24}
             sm={12}
             md={12}
             lg={7}
             xl={8}
             style={{
               padding: 5,
               marginRight: 5,
             }}
            >
            <Button
            type="primary"
              onClick={() => {
                setFertDeadline(
                  Date.now() + 1000 * 1 * 1 * 1 * plant.fertilise_freq
                );
              }}
            >
              <UndoOutlined style={{color: "#fff"}}/> Reset Timer
            </Button>
            </Col>
          </Row>

      ) : (
        //*======IF FERT INFO NOT PROVIDED=======//
        <Row
        style={{
          padding: 5,
          paddingTop: 10,
          marginBottom: 8,
        }}
        >
          <Title className="rubik" level={4}>
            Fertilise Frequency not provided
          </Title>
          <EditOutlined
            onClick={() => {
              setFertVis(true);
            }}
            style={{ fontSize: "14px", margin: "5px" }}
          />
          <EditFertFreq
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
            fertVis={fertVis}
            setFertVis={setFertVis}
            setFertDeadline={setFertDeadline}
          />
        </Row>
      )}

<Divider />
      {plant.progressTrack_freq ? (
        <Row
        style={{
          padding: 5,
          marginRight: 5,
          marginBottom: 8
        }}
        >
          <Col 
          xs={24}
          sm={12}
          md={12}
          lg={7}
          xl={7}
          style={{
            padding: 5,
            marginRight: 5,
          }}>
            <Row>
            <Title className="rubik" level={5}>
              🤳 Take a progress picture every
              <span style={{ color: "#3cacfc", margin: "0 4px" }}>
                {plant.progressTrack_freq}
              </span>
              days
            </Title>
            <EditOutlined
              onClick={() => {
                setProgVis(true);
              }}
              style={{ fontSize: "14px", margin: "5px" }}
            />
            <EditProgressFreq
              userStorage={userStorage}
              plant={plant}
              formChanged={formChanged}
              setFormChanged={setFormChanged}
              progVis={progVis}
              setProgVis={setProgVis}
              setProgressDeadline={setProgressDeadline}
            />
            </Row>
          </Col>
          <Col
              xs={24}
              sm={12}
              md={12}
              lg={7}
              xl={8}
              style={{
                padding: 5,
                marginRight: 5,
              }}
            >
               <Title className="rubik" level={5}>
                Take photo in:
              </Title>
              <Countdown
                valueStyle={{ fontSize: "16px", fontFamily: "'Rubik', sans-serif" }}
                value={progressDeadline}
                onFinish={pictured}
                format="D [Days] H [hours] m [min] s [sec]"
              />
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={7}
              xl={8}
              style={{
                padding: 5,
                marginRight: 5,

              }}
            >
          <Button
          type="primary"
            onClick={() => {
              setProgressDeadline(
                Date.now() + 1000 * 1 * 1 * 1 * plant.progressTrack_freq
              );
            }}
          >
            <UndoOutlined style={{color: "#fff"}}/> Reset Timer
          </Button>
          </Col>
        </Row>
      ) : (
        <Row
        style={{
          border: "1px solid",
          borderRadius: 10,
          padding: 5,
          paddingTop: 10,
          marginBottom: 8,
        }}>
        <Title className="rubik" level={4}>
          Progress Track Frequency not provided
        </Title>
        <EditOutlined
              onClick={() => {
                setProgVis(true);
              }}
              style={{ fontSize: "14px", margin: "5px" }}
            />
            <EditProgressFreq
              userStorage={userStorage}
              plant={plant}
              formChanged={formChanged}
              setFormChanged={setFormChanged}
              progVis={progVis}
              setProgVis={setProgVis}
              setProgressDeadline={setProgressDeadline}
            />
      </Row>
      )}
    </div>
  );
};

export default CareCountdown;
