import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Image, Button, Row, Col, Typography } from "antd";
import { LeftOutlined, RightOutlined, EditOutlined } from "@ant-design/icons";
import Environment from "./PlantDetailsComponents/3_Environment";
import CareCountdown from "./PlantDetailsComponents/2_CareCountdown";
import Edible from "./PlantDetailsComponents/4_Edible";
import Entries from "./PlantDetailsComponents/5_Entries";
import NameSpeciesDate from "./PlantDetailsComponents/1_NameSpeciesDate";
import EditImageUpload from "./EditPlantDetails/18_EditImageUpload";

const { Title, Text } = Typography;

const PlantDetails = () => {
  const [formChanged, setFormChanged] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  //*======Get User Info from Local Storage============
  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  };
  const userStorage = getUserInfo();
  //*====================================================

  const { name } = useParams();
  
  const { data, isLoading, error } = useQuery(
    ["plant", name, formChanged],
    () => axios(`/v1/plants/${name}`)
  );

  if (error) {
    console.log("error: ", error.message);
    return <h1>Error:{error.message}, try again!</h1>;
  }
  if (isLoading) {
    console.log("loading...");
    return <h1>Loading</h1>;
  }

  const plant = data?.data;
  console.log(plant);

  return (
    <div>
      <Link to={`/dashboard/${userStorage.username}`}>
        <Button>Back</Button>
      </Link>
      <Text> {plant.location}</Text>

      <Row style={{ marginTop: "15px" }}>
        <Col span={8}>
          <Row>
            <Title className="rubik" level={4}>
              Latest Image of {plant.name}
            </Title>
            <EditOutlined
              onClick={() => {
                setImageVisible(true);
              }}
              style={{ margin: "5px" }}
            />
            <EditImageUpload
          userStorage={userStorage}
          plant={plant}
          imageVisible={imageVisible}
          setImageVisible={setImageVisible}
          formChanged={formChanged}
          setFormChanged={setFormChanged}
        />
          </Row>
          <Image
            height={300}
            src={plant.image_upload[plant.image_upload.length - 1]}
          />
          <Title className="rubik" level={4}>
            {plant.name}'s progress:
          </Title>
          <Row>
            <Image.PreviewGroup>
              {plant?.image_upload.map((image, index) => (
                <div key={index} style={{ margin: 5 }}>
                  <Image
                    style={{
                      objectFit: "cover",
                      width: "120px",
                      height: "120px",
                    }}
                    src={image}
                  />
                </div>
              ))}
            </Image.PreviewGroup>
          </Row>
        </Col>
        <Col span={16}>
          <NameSpeciesDate
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />

          <CareCountdown
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />

          <Environment
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />

          <Edible
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />

          <Link to={`/dashboard/${userStorage.username}/${plant.name}/log`}>
          <Button>Add Log</Button>
          </Link>

        </Col>
      </Row>
    </div>
  );
};

export default PlantDetails;
