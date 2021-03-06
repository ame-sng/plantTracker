import React, { useEffect, useState } from "react";
import { LogContext } from "../../LogContext";
import { useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DeleteOutlined, DeleteTwoTone, EditOutlined } from "@ant-design/icons";

import {
  Card,
  Row,
  Col,
  Collapse,
  Tabs,
  Divider,
  Button,
  Image,
  Typography,
  Popconfirm,
  message,
} from "antd";

const { Meta } = Card;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

const AllPlants = () => {
  const [deleted, setDeleted] = useState(true);
  const [reminders, setReminders] = useState([])
  
  useEffect(()=>{
    const login = localStorage.getItem("loggedIn")
  }, [])
  
  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  };
  
  const userStorage = getUserInfo();
  console.log("Display all plants userStorage: ", userStorage);

  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries("user")

  const { username } = useParams();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStorage.token}`,
    },
    url: `/v1/users/${username}`,
  };

  const { data, isLoading, error } = useQuery(["user", username, deleted], () =>
    axios(options)
  );

  const user = data?.data;
  console.log("useQuery user data: ", user);

  if (error) {
    console.log("error: ", error.message);
    return <h1>Error:{error.message}, try again!</h1>;
  }
  if (isLoading) {
    console.log("loading...");
    return <h1>Loading</h1>;
  }
  const indoorPlants = user?.plants.filter(
    (plant) => plant.location === "Indoor"
  );
  console.log("indoor", indoorPlants);

  const outdoorPlants = user?.plants.filter(
    (plant) => plant.location === "Outdoor"
  );
  console.log("outdoor", outdoorPlants);

  const nolocPlants = user?.plants.filter(
    (plant) => plant.location !== "Indoor" && plant.location !== "Outdoor"
  );
  console.log("no locale", nolocPlants);

  function confirm(e) {
    handleDelete(e);
    message.success({
      content: 'Plant has been deleted',
      className: 'knewave',
      style: {
        marginTop: '20vh',
      },
    });
  }

  const handleDelete = (id) => {
    console.log("delete: ", id);
    fetch(`/v1/plants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setDeleted(!deleted);
          return res.json();
        }
        throw new Error("Error in network");
      })
      .then((resJson) => {
        console.log("resJson: ", resJson);
      });
  };

  return (
    <div>
      <div>
        <Title className="knewave" level={2}>
          Welcome back, {user.username}
        </Title>
      </div>
      <Link to="/addplant">
        <Button type="primary" size="large">Add Plant Baby</Button>
      </Link>
      <Divider />
      <Tabs type="card" className="rubik">
        <TabPane tab="Indoor" key="1">
          <h1>Indoor</h1>
          <Row gutter={[16, 16]}>
            {indoorPlants?.map((inPlant, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                className="fascinate"
                  style={{ height: 250, width: 200, borderColor: "#98D1FA"}}
                  headStyle={{height: 20, backgroundColor: "#98D1FA", letterSpacing: "0.05em"}}
                  title={
                    <Link className="fascinate" to={`/dashboard/${username}/${inPlant.name}`}>
                      {inPlant.name}
                    </Link>
                  }
                  cover={
                    <Link to={`/dashboard/${username}/${inPlant.name}`}>
                      <Image
                        alt="example"
                        preview={false}
                        src={
                          inPlant.image_upload[inPlant.image_upload.length - 1]
                        }
                        style={{objectFit: "cover", height: 201, width: 200}}
                        />
                    </Link>
                  }
                  extra={
                    <Popconfirm
                      title="Are you sure to delete this plant?"
                      onConfirm={() => confirm(inPlant._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>
                  }
                  key={index}
                >
              
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Outdoor" key="2">
          <h1>Outdoor</h1>
          <Row gutter={[16, 16]}>
            {outdoorPlants?.map((outPlant, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  className="fascinate"
                  style={{ height: 250, width: 200 }}
                  headStyle={{height: 20, backgroundColor: "#98D1FA"}}
                  title={
                    <Link className="fascinate" to={`/dashboard/${username}/${outPlant.name}`}>
                      {outPlant.name}
                    </Link>
                  }
                  cover={
                    <Link to={`/dashboard/${username}/${outPlant.name}`}>
                      <Image
                        alt="example"
                        preview={false}
                        src={
                          outPlant.image_upload[
                            outPlant.image_upload.length - 1
                          ]
                        }
                        style={{objectFit: "cover", height: 201, width: 200}}
                      />
                    </Link>
                  }
                  extra={
                    <Popconfirm
                      title="Are you sure to delete this plant?"
                      onConfirm={() => confirm(outPlant._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>
                  }
                  key={index}
                ></Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Other" key="3">
          <h1>Other</h1>
          <Row gutter={[16, 16]}>
            {nolocPlants?.map((nolocPlant, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  className="fascinate"
                  style={{ height: 250, width: 200 }}
                  headStyle={{height: 20, backgroundColor: "#98D1FA"}}
                  title={
                    <Link className="fascinate" to={`/dashboard/${username}/${nolocPlant.name}`}>
                      {nolocPlant.name}
                    </Link>
                  }
                  cover={
                    <Link to={`/dashboard/${username}/${nolocPlant.name}`}>
                      <Image
                        alt="example"
                        preview={false}
                        src={
                          nolocPlant.image_upload[
                            nolocPlant.image_upload.length - 1
                          ]
                        }
                        style={{objectFit: "cover", height: 201, width: 200}}
                      />
                    </Link>
                  }
                  extra={
                    <Popconfirm
                      title="Are you sure to delete this plant?"
                      onConfirm={() => confirm(nolocPlant._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>
                  }
                  key={index}
                ></Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AllPlants;
