import React, { useState } from "react";
import { Typography, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditSunlight from "../EditPlantDetails/7_EditSunlight";
import EditGrowingMedium from "../EditPlantDetails/8_EditGrowingMedium";
import EditPotSize from "../EditPlantDetails/9_EditPotSize";
import EditPotDrain from "../EditPlantDetails/10_EditPotDrain";

const { Title, Paragraph } = Typography;

const Environment = ({ 
  userStorage,
  plant,
  formChanged,
  setFormChanged, }) => {
  const [sunVisible, setSunVisible] = useState(false);
  const [growVisible, setGrowVisible] = useState(false);
  const [sizeVisible, setSizeVisible] = useState(false);
  const [drainVisible, setDrainVisible] = useState(false);

  return (
    <div>
      <Row>
        {plant.sunlight ? (
          <Title className="rubik" level={4}>
            Sunlight: {plant.sunlight}
          </Title>
        ) : (
          <Title className="rubik" level={4}>
            Sunlight not provided
          </Title>
        )}
        <EditOutlined
          onClick={() => {
            setSunVisible(true);
          }}
          style={{ margin: "5px" }}
        />
        <EditSunlight
          userStorage={userStorage}
          plant={plant}
          sunVisible={sunVisible}
          setSunVisible={setSunVisible}
          formChanged={formChanged}
          setFormChanged={setFormChanged}
        />
      </Row>
{/* ====================================================== */}
      <Row>
        {plant.growing_medium ? (
          <>
          <Title className="rubik" level={4}>
            Growing Medium: 
          </Title>
          <EditOutlined
          onClick={() => {
            setGrowVisible(true);
          }}
          style={{ margin: "5px" }}
        />
          <Paragraph style={{fontSize: 18}}>
          {plant.growing_medium}
          </Paragraph>
          </>
        ) : (
          <>
          <Title className="rubik" level={4}>
            Growing Medium not provided
          </Title>
          <EditOutlined
          onClick={() => {
            setGrowVisible(true);
          }}
          style={{ margin: "5px" }}
        />
          </>
        )}
        
        <EditGrowingMedium 
        userStorage={userStorage}
        plant={plant}
        growVisible={growVisible}
        setGrowVisible={setGrowVisible}
        formChanged={formChanged}
        setFormChanged={setFormChanged}
        />
      </Row>
{/* ====================================================== */}
      <Row>
        {plant.pot_size ? (
          <Title className="rubik" level={4}>
            Pot Size: {plant.pot_size}in
          </Title>
        ) : (
          <Title className="rubik" level={4}>
            Pot Size not provided
          </Title>
        )}
        <EditOutlined
          onClick={() => {
            setSizeVisible(true);
          }}
          style={{ margin: "5px" }}
        />
        <EditPotSize
        userStorage={userStorage}
        plant={plant}
        sizeVisible={sizeVisible}
        setSizeVisible={setSizeVisible}
        formChanged={formChanged}
        setFormChanged={setFormChanged}
        />
      </Row>
{/* ====================================================== */}
      <Row>
        {plant.pot_drain ? (
          <Title className="rubik" level={4}>
            Pot Drainage: {plant.pot_drain ? "Yes" : "No"}
          </Title>
        ) : (
          <Title className="rubik" level={4}>
            Pot Drainage not provided
          </Title>
        )}
        <EditOutlined
          onClick={() => {
            setDrainVisible(true);
          }}
          style={{ margin: "5px" }}
        />
        <EditPotDrain
        userStorage={userStorage}
        plant={plant}
        drainVisible={drainVisible}
        setDrainVisible={setDrainVisible}
        formChanged={formChanged}
        setFormChanged={setFormChanged}
        />
      </Row>
    </div>
  );
};

export default Environment;
