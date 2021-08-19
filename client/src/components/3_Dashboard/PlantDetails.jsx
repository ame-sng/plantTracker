import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Image, Button, Row, Col, Typography, Tabs } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Environment from "./PlantDetailsComponents/3_Environment";
import CareCountdown from "./PlantDetailsComponents/2_CareCountdown";
import Edible from "./PlantDetailsComponents/4_Edible";
import Entries from "./PlantDetailsComponents/5_Entries";
import NameSpeciesDate from "./PlantDetailsComponents/1_NameSpeciesDate";
import EditImageUpload from "./EditPlantDetails/18_EditImageUpload";
import AddLog from "./AddLog";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const PlantDetails = () => {
  const [formChanged, setFormChanged] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [visible, setVisible] = useState(false); //drawer
  const [waterTime, setWaterTime] = useState();
  const [fertTime, setFertTime] = useState();
  const [progressTime, setProgressTime] = useState();

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

  const handleImage = (e) => {
    console.log("value: ", e);
  };

  return (
    <div>
      <Link to={`/dashboard/${userStorage.username}`}>
        <Button style={{ borderColor: "#98d1fa", marginBottom: 25 }}>
          Back
        </Button>
      </Link>
      <Text> {plant.location}</Text>
      <Tabs type="card">
        <TabPane tab="Plant Details" key="1">
          <Row style={{ marginTop: "15px" }} >
            <Col
              xs={22}
              sm={22}
              md={22}
              lg={12}
              xl={15}
              style={{ padding: "15px", border: "1px solid lightgrey", borderRadius: 10 }}
            >
              <NameSpeciesDate
                userStorage={userStorage}
                plant={plant}
                formChanged={formChanged}
                setFormChanged={setFormChanged}
              />
              <div
              style={{
                backgroundColor: "#eaf2f7",
                padding: 5,
                borderRadius: 10,
                marginBottom: 10,
              }}
              >
              <CareCountdown
                userStorage={userStorage}
                plant={plant}
                formChanged={formChanged}
                setFormChanged={setFormChanged}
                setWaterTime={setWaterTime}
                setFertTime={setFertTime}
                setProgressTime={setProgressTime}
              />
              </div>
              <div
              style={{
                backgroundColor: "#eaf2f7",
                padding: 5,
                borderRadius: 10,
                marginBottom: 10,
              }}
              >
              <Environment
                userStorage={userStorage}
                plant={plant}
                formChanged={formChanged}
                setFormChanged={setFormChanged}
              />
              </div>

              <div
              style={{
                backgroundColor: "#eaf2f7",
                padding: 5,
                borderRadius: 10,
                marginBottom: 10,
              }}
              >
              <Edible
                userStorage={userStorage}
                plant={plant}
                formChanged={formChanged}
                setFormChanged={setFormChanged}
              />
              </div>

              {/* <Link to={`/dashboard/${userStorage.username}/${plant.name}/log`}>
          <Button>Add Log</Button>
        </Link> */}
            </Col>
            <Col
              xs={22}
              sm={22}
              md={22}
              lg={12}
              xl={8}
              style={{ padding: "15px" }}
            >
              <Row justify= "center" >
                <Title level={4}>Latest Image of {plant.name}</Title>
                {/* <EditOutlined
                  onClick={() => {
                    setImageVisible(true);
                  }}
                  style={{ margin: "5px" }}
                /> */}
                <EditImageUpload
                  userStorage={userStorage}
                  plant={plant}
                  imageVisible={imageVisible}
                  setImageVisible={setImageVisible}
                  formChanged={formChanged}
                  setFormChanged={setFormChanged}
                />
              </Row>
              <Row justify= "center">
              <Image
                height={300}
                src={plant.image_upload[plant.image_upload.length - 1]}
              />
                <Button
                  className="fascinate"
                  type="primary"
                  style={{marginTop: 8}}
                  onClick={() => {
                    setImageVisible(true);
                  }}
                >
                  <PlusOutlined /> Add New Image
                </Button>
              </Row>
              <Row justify= "center" style={{ marginTop:8}}>
              <Title level={4}>{plant.name}'s progress:</Title>
              </Row>
              <Row justify= "center">
                <Image.PreviewGroup>
                  {plant?.image_upload.map((image, index) => (
                    <div key={index} style={{ margin: 5 }}>
                      <Image
                        style={{
                          objectFit: "cover",
                          width: "150px",
                          height: "150px",
                        }}
                        src={image}
                        key={index}
                        onClick={handleImage}
                      />
                    </div>
                  ))}
                </Image.PreviewGroup>
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Plant Logs" key="2">
          <Entries
            userStorage={userStorage}
            plant={plant}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
            visible={visible}
            setVisible={setVisible}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PlantDetails;
