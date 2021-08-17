import React, { useState } from "react";
import { Typography, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import EditPlantName from "../EditPlantDetails/1_EditPlantName";
import EditPlantSpecies from "../EditPlantDetails/2_EditPlantSpecies";
import EditPlantDate from "../EditPlantDetails/3_EditPlantDate";


const { Title } = Typography;

const NameSpeciesDate = ({
  userStorage,
  plant,
  formChanged,
  setFormChanged,
}) => {
  const [nameVisible, setNameVisible] = useState(false);
  const [speciesVisible, setSpeciesVisible] = useState(false);
  const [dateStartVisible, setDateStartVisible] = useState(false);

  return (
    <div>
      <Row>
        <Title className="knewave">{plant.name}</Title>{" "}
        <EditOutlined
          onClick={() => {
            setNameVisible(true);
          }}
          style={{ fontSize: "18px", margin: "5px" }}
        />
        <EditPlantName
          userStorage={userStorage}
          plant={plant}
          nameVisible={nameVisible}
          setNameVisible={setNameVisible}
        />
      </Row>

      <Row>
        {plant.species ? (
          <Title className="rubik" level={3}>
            Species: {plant.species}
          </Title>
        ) : (
          <Title className="rubik" level={3}>
            Species not provided
          </Title>
        )}
        <EditOutlined
          onClick={() => {
            setSpeciesVisible(true);
          }}
          style={{ margin: "5px" }}
        />
        <EditPlantSpecies
          userStorage={userStorage}
          plant={plant}
          speciesVisible={speciesVisible}
          setSpeciesVisible={setSpeciesVisible}
          formChanged={formChanged}
          setFormChanged={setFormChanged}
        />
      </Row>

      <Row>
        {plant.date_started ? (
          <Title className="rubik" level={4}>
            Date Started: {moment(plant.date_started).format("Do MMMM YYYY")}
          </Title>
        ) : (
          <Title className="rubik" level={3}>
            Species not provided
          </Title>
        )}
        <EditOutlined
          onClick={() => {
            setDateStartVisible(true);
          }}
          style={{ margin: "5px" }}
        />
        <EditPlantDate
          userStorage={userStorage}
          plant={plant}
          dateStartVisible={dateStartVisible}
          setDateStartVisible={setDateStartVisible}
          formChanged={formChanged}
          setFormChanged={setFormChanged}/>
      </Row>
    </div>
  );
};

export default NameSpeciesDate;
