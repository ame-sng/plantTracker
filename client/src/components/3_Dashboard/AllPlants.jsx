import React, { useEffect, useState } from "react";
import { LogContext } from "../../LogContext";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Card, Row, Col, Collapse, Tabs, Divider, Button, Image, Typography } from "antd";

const { Meta } = Card;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

const AllPlants = () => {
  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  }
  const userStorage = getUserInfo();
  console.log("Display all plants userStorage: ", userStorage)

  const { username } = useParams();
  const { data, isLoading, error } = useQuery(["user", username], () =>
    axios(`/v1/users/${username}`)
  );

  const user = data?.data;
  console.log("useQuery user data: ", user);

  if (error) {
    console.log("error: ", error.message);
    return (
      <h1>
        Error:{error.message}, try again!
      </h1>
    );
  }
  if (isLoading) {
    console.log("loading...");
    return <h1>Loading</h1>;
  }
  const indoorPlants = user?.plants.filter((plant) => plant.location === "Indoor");
  console.log("indoor", indoorPlants);

  const outdoorPlants = user?.plants.filter((plant) => plant.location === "Outdoor");
  console.log("outdoor", outdoorPlants);

  const nolocPlants = user?.plants.filter((plant) => (plant.location !== "Indoor") && (plant.location !== "Outdoor"));
  console.log("no locale", nolocPlants);

  //here
  
  return (
    <div>
      <div>
      <Title className="knewave" level={2}>Welcome back, {user.username}</Title> {/* //!CHANGE TO CONTEXT DATA */}
      </div>
        <Link to="/addplant">
      <Button>
        Add Plant
      </Button>
        </Link>
      <Divider />
      <Tabs type="card">
      <TabPane tab="Indoor" key="1">
      <h1>Indoor</h1>
      <Row gutter={[16, 16]}>
        {indoorPlants?.map((inPlant, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to={`/dashboard/${username}/${inPlant.name}`}>
            <Card
              cover={
                <Image
                  alt="example"
                  height={200}
                  width="100%"
                  preview={false}
                  src={inPlant.image_upload[inPlant.image_upload.length - 1]}
                />
              }
              key={index}
            >
              <Meta
                title={inPlant.name}
              />
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </TabPane>
    <TabPane tab="Outdoor" key="2">
      <h1>Outdoor</h1>
      <Row gutter={[16, 16]}>
        {outdoorPlants?.map((outPlant, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to={`/dashboard/${username}/${outPlant.name}`}>
            <Card
              cover={
                <Image
                height={200}
                  width="100%"
                  preview={false}
                  alt="example"
                  src={outPlant.image_upload[outPlant.image_upload.length - 1]}
                />
              }
              key={index}
            >
              <Meta
                title={outPlant.name}
                description="This is the description"
              />
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </TabPane>
    <TabPane tab="Others" key="3">
    <h1>Other</h1>
      <Row gutter={[16, 16]}>
        {nolocPlants?.map((nolocPlant, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to={`/dashboard/${username}/${nolocPlant.name}`}>
            <Card
              cover={
                <Image
                height={200}
                  width="100%"
                  preview={false}
                  alt="example"
                  src={nolocPlant.image_upload[nolocPlant.image_upload.length - 1]}
                />
              }
              key={index}
            >
              <Meta
                title={nolocPlant.name}
                description="This is the description"
              />
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </TabPane>


      </Tabs>
      
    </div>
  );
};

export default AllPlants;
