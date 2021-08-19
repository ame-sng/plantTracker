import React, { useState, useEffect } from "react";
import {
  Statistic,
  Row,
  Col,
  Typography,
  Button,
  DatePicker,
  notification,
} from "antd";
import { SmileOutlined, EditOutlined } from "@ant-design/icons";
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
        <Row>
          <Row>
            <Title className="rubik" level={4}>
              Water every {plant.water_freq} days
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

          <Row>
            <Col span={12}>
              <Title className="rubik" level={4}>
                Water {plant.name} in
              </Title>
            </Col>
            <Col span={12}>
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
          </Row>
          <Row>
            <Button
              onClick={() => {
                setWaterDeadline(
                  Date.now() + 1000 * 1 * 1 * 1 * plant.water_freq
                );
              }}
            >
              Reset Water Countdown
            </Button>
          </Row>
        </Row>
      ) : (
        //*======IF WATER INFO NOT PROVIDED=======//
        <Row>
          <Title className="rubik" level={4}>
            Water Frequency not provided
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
      )}

      {plant.fertilise_freq ? (
        <Row>
          <Row>
            <Title className="rubik" level={4}>
              Fertilise every {plant.fertilise_freq} days
            </Title>
            <EditOutlined
              onClick={() => {
                setFertVis(true);
              }}
              style={{ fontSize: "18px", margin: "5px" }}
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
          <Row>
            <Col span={12}>
              <Title className="rubik" level={4}>
                Fertilise {plant.name} in
              </Title>
            </Col>
            <Col span={12}>
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
            <Button
              onClick={() => {
                setFertDeadline(
                  Date.now() + 1000 * 1 * 1 * 1 * plant.fertilise_freq
                );
              }}
            >
              Reset Fertilise Countdown
            </Button>
          </Row>
        </Row>
      ) : (
         //*======IF FERT INFO NOT PROVIDED=======//
        <Row>
          <Title className="rubik" level={4}>
            Fertilise Frequency not provided
          </Title>
          <EditOutlined
            onClick={() => {
              setFertVis(true);
            }}
            style={{ fontSize: "18px", margin: "5px" }}
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

      {plant.progressTrack_freq ? (
        <Row>
          <Col span={12}>
            <Title className="rubik" level={4}>
              Take a progress picture of {plant.name} in
            </Title>
            <EditOutlined
              onClick={() => {
                setProgVis(true);
              }}
              style={{ fontSize: "18px", margin: "5px" }}
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
          </Col>
          <Countdown
            valueStyle={{ fontSize: "16px", fontFamily: "'Rubik', sans-serif" }}
            value={progressDeadline}
            onFinish={pictured}
            format="D [Days] H [hours] m [min] s [sec]"
          />
          <Button
            onClick={() => {
              setProgressDeadline(
                Date.now() + 1000 * 1 * 1 * 1 * plant.progressTrack_freq
              );
            }}
          >
            Reset Fertilise Countdown
          </Button>
        </Row>
      ) : (
        <Title className="rubik" level={4}>
          Progress Track Frequency not provided
        </Title>
      )}
    </div>
  );
};

export default CareCountdown;
