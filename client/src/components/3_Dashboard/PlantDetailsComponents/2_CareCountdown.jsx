import React, { useState } from "react";
import { Statistic, Row, Col, Typography, Button } from "antd";
import moment from "moment";

const { Countdown } = Statistic;
const {Title, Text, Paragraph} = Typography

const CareCountdown = ({ plant }) => {
  //! RELOOK AT THE FUNCTIONALITY - USER EXPERIENCE

  const [waterdeadline, setWaterDeadline] = useState(
    parseInt(moment(plant.date_started).format("x")) + 1000 * 60 * 60 * 24 * plant.water_freq
  );
  const [fertDeadline, setFertDeadline] = useState(
    parseInt(moment(plant.date_started).format("x")) + 1000 * 60 * 60 * 24 * plant.fertilise_freq
  );
  const [progressDeadline, setProgressDeadline] = useState(
    parseInt(moment(plant.date_started).format("x")) + 1000 * 60 * 60 * 24 * plant.progressTrack_freq
  )

  const watered = () => {
    console.log("finished!");
    setWaterDeadline(Date.now() + 1000 * 60 * 60 * 24 * plant.water_freq)
    
    
  };
  
  const fertilised = () => {
    console.log("finished!");
    setFertDeadline(Date.now() + 1000 * 60 * 60 * 24 * plant.fertilise_freq);
  };

  const pictured = () => {
    console.log("finished!");
    setProgressDeadline(Date.now() + 1000 * 60 * 60 * 24 * plant.progressTrack_freq);
  };

  return (
    <div>
      {plant.water_freq ? 
        (<Row>
          <Col span={12}>
          <Title className="rubik" level={4}> Water {plant.name} in </Title>
          </Col>
          <Col span={12}>
          <Countdown
          valueStyle={{fontSize: "16px", fontFamily: "'Rubik', sans-serif"}}
            value={waterdeadline}
            onFinish={watered}
            format="D [Days] H [hours] m [min] s [sec]"
          />
          </Col>
          <Button onClick={() => {setWaterDeadline(Date.now() + 1000 * 60 * 60 * 24 * plant.water_freq);}}>
        Click when watered to restart countdown
      </Button>
        </Row>) : <Title className="rubik" level={4}> Water Frequency not provided </Title>
      }

      {plant.fertilise_freq ? (
        <Row>
          <Col span={12}>
          <Title className="rubik" level={4}> Fertilise {plant.name} in </Title>
          </Col>
          <Col span={12}>
          <Countdown
          valueStyle={{fontSize: "16px", fontFamily: "'Rubik', sans-serif"}}
            value={fertDeadline}
            onFinish={fertilised}
            format="D [Days] H [hours] m [min] s [sec]"
          />
          </Col>
        </Row>
      ) : <Title className="rubik" level={4}> Fertilise Frequency not provided </Title>}

{plant.progressTrack_freq ? (
        <Row>
          <Col span={12}>
          <Title className="rubik" level={4}> Take a progress picture of {plant.name} in </Title>
          </Col>
          <Countdown
          valueStyle={{fontSize: "16px", fontFamily: "'Rubik', sans-serif"}}
            value={progressDeadline}
            onFinish={pictured}
            format="D [Days] H [hours] m [min] s [sec]"
          />
        </Row>
      ): <Title className="rubik" level={4}> Progress Track Frequency not provided </Title>}
    </div>
  );
};

export default CareCountdown;
