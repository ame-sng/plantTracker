import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Image, Button, Row, Col, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Environment from "./PlantDetailsComponents/3_Environment";
import CareCountdown from "./PlantDetailsComponents/2_CareCountdown";
import Edible from "./PlantDetailsComponents/4_Edible";
import Entries from "./PlantDetailsComponents/Entries";
import NameSpeciesDate from "./PlantDetailsComponents/1_NameSpeciesDate";

const { Title, Text } = Typography;

const PlantDetails = () => {
  const [formChanged, setFormChanged] = useState(false)

  //*======Get User Info from Local Storage============
  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  };
  const userStorage = getUserInfo();
  //*====================================================

  const { name } = useParams();
  const { data, isLoading, error } = useQuery(["plant", name, formChanged], () =>
    axios(`/v1/plants/${name}`)
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />
  };

  const asettings = {
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />
  }

  return (
    <div>
      <Link to={`/dashboard/${userStorage.username}`}>
        <Button>Back</Button>
      </Link>
      <Text> {plant.location}</Text>

      <Row style={{ marginTop: "15px" }}>
        <Col span={8}>
          <Title className="rubik" level={4}>
            Latest Image of {plant.name}
          </Title>
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
          
          
           

          <NameSpeciesDate userStorage={userStorage} plant={plant} formChanged={formChanged} setFormChanged={setFormChanged}/>

          <CareCountdown plant={plant} />

          <Environment plant={plant}/>

          <Edible plant={plant} />
        </Col>
      </Row>
    </div>
  );
};

export default PlantDetails;
