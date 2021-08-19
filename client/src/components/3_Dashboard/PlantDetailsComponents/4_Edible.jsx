import React, { useState, useEffect } from "react";
import { Typography, Row, Switch } from "antd";
import { EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import EditDateTransplanted from "../EditPlantDetails/11_EditDateTransplanted";
import EditFirstSprout from "../EditPlantDetails/12_EditFirstSprout";
import EditFirstFlower from "../EditPlantDetails/13_EditFirstFlower";
import EditFirstFruit from "../EditPlantDetails/14_EditFirstFruit";
import EditFirstHarvest from "../EditPlantDetails/15_EditFirstHarvest";
import EditLastHarvest from "../EditPlantDetails/16_EditLastHarvest";
import EditMethod from "../EditPlantDetails/17_EditMethod";

const { Title } = Typography;

const Edible = ({ userStorage, plant, formChanged, setFormChanged }) => {
  const [edibleSwitch, setEdibleSwitch] = useState(plant.edible);
  // const [edibleVis, setEdibleVis] = useState(false)
  const [dateTransVis, setDateTransVis] = useState(false);
  const [sproutVis, setSproutVis] = useState(false);
  const [flowerVis, setFlowerVis] = useState(false);
  const [fruitVis, setFruitVis] = useState(false);
  const [firstHarvestVis, setFirstHarvestVis] = useState(false);
  const [lastHarvestVis, setLastHarvestVis] = useState(false);
  const [methodVis, setMethodVis] = useState(false);

  useEffect(() => {
    try {
      fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          edible: edibleSwitch,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [edibleSwitch]);

  const onChange = async (checked) => {
    console.log(`switch to ${checked}`);
    setEdibleSwitch(checked ? "Edible" : "Non-edible");
    setFormChanged(!formChanged);
  };

  if (plant.edible === "Edible") {
    return (
      <div>
        <Row style={{
        padding: 5,
        marginRight: 5,
        marginBottom: 8
      }}>
          <Switch defaultChecked onChange={onChange} />
          <Title className="rubik" level={4}>
            Edible
          </Title>
          <CheckCircleOutlined style={{ margin: "5px", fontSize: "17px" }}/>
          {/* <EditOutlined
          onClick={() => {
            setEdibleVis(true);
          }}
          style={{ margin: "5px" }}
        /> */}
        </Row>

        <Title className="knewave" level={3} style={{padding: 5}}>LIFECYCLE DATES</Title>
        {/* ====================================================== */}
        <Row style={{padding: 5}}>
          {plant.method ? (
            <Title className="rubik" level={5}>
              Method of Propagation: {plant.method}
            </Title>
          ) : (
            <Title className="rubik" level={5}>
              Method of Propagation not provided
            </Title>
          )}
          <EditOutlined
            onClick={() => {
              setMethodVis(true);
            }}
            style={{ margin: "5px" }}
          />
          <EditMethod
            userStorage={userStorage}
            plant={plant}
            methodVis={methodVis}
            setMethodVis={setMethodVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />
        </Row>

        {/* ====================================================== */}

        <Row style={{padding: 5}}>
          {plant.date_transplanted ? (
            <Title className="rubik" level={5}>
              Date Transplanted:{" "}
              {moment(plant.date_transplanted).format("Do MMMM YYYY")}
            </Title>
          ) : (
            <Title className="rubik" level={5}>
              Date Transplanted not provided
            </Title>
          )}
          <EditOutlined
            onClick={() => {
              setDateTransVis(true);
            }}
            style={{ margin: "5px" }}
          />
          <EditDateTransplanted
            userStorage={userStorage}
            plant={plant}
            dateTransVis={dateTransVis}
            setDateTransVis={setDateTransVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />
        </Row>
        {/* ====================================================== */}

        <Row style={{padding: 5}}>
          {plant.first_sprout ? (
            <Title className="rubik" level={5}>
              First Sprout: {moment(plant.first_sprout).format("Do MMMM YYYY")}
            </Title>
          ) : (
            <Title className="rubik" level={5}>
              Date of First Sprout not provided
            </Title>
          )}
          <EditOutlined
            onClick={() => {
              setSproutVis(true);
            }}
            style={{ margin: "5px" }}
          />
          <EditFirstSprout
            userStorage={userStorage}
            plant={plant}
            sproutVis={sproutVis}
            setSproutVis={setSproutVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />
        </Row>

        {/* ====================================================== */}

        <Row style={{padding: 5}}>
          {plant.first_flower ? (
            <Title className="rubik" level={5}>
              First Flower: {moment(plant.first_flower).format("Do MMMM YYYY")}
            </Title>
          ) : (
            <Title className="rubik" level={5}>
              Date of First Flower not provided
            </Title>
          )}
          <EditOutlined
            onClick={() => {
              setFlowerVis(true);
            }}
            style={{ margin: "5px" }}
          />
          <EditFirstFlower
            userStorage={userStorage}
            plant={plant}
            flowerVis={flowerVis}
            setFlowerVis={setFlowerVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />
        </Row>

        {/* ====================================================== */}
        <Row style={{padding: 5}}>
          {plant.first_fruit ? (
            <Title className="rubik" level={5}>
              First Fruit: {moment(plant.first_fruit).format("Do MMMM YYYY")}
            </Title>
          ) : (
            <Title className="rubik" level={5}>
              Date of First Fruit not provided
            </Title>
          )}
          <EditOutlined
            onClick={() => {
              setFruitVis(true);
            }}
            style={{ margin: "5px" }}
          />
          <EditFirstFruit
            userStorage={userStorage}
            plant={plant}
            fruitVis={fruitVis}
            setFruitVis={setFruitVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />
        </Row>

        {/* ====================================================== */}

        <Row style={{padding: 5}}>
        {plant.first_harvest ? (
        <Title className="rubik" level={5}>
          First Harvest: {moment(plant.first_harvest).format("Do MMMM YYYY")}
        </Title>
        )
        :
        (<Title className="rubik" level={5}>
            Date of First Harvest not provided
          </Title>)
        } 
        <EditOutlined
            onClick={() => {
              setFirstHarvestVis(true);
            }}
            style={{ margin: "5px" }}
            />
          <EditFirstHarvest
            userStorage={userStorage}
            plant={plant}
            firstHarvestVis={firstHarvestVis}
            setFirstHarvestVis={setFirstHarvestVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
            />
        </Row>

        {/* ====================================================== */}

        <Row style={{padding: 5}}>
          {plant.last_harvest ? (
        <Title className="rubik" level={5}>
          Last Harvest: {moment(plant.last_harvest).format("Do MMMM YYYY")}
        </Title>)
          :
          (<Title className="rubik" level={5}>
            Date of Last Harvest not provided
          </Title>)
        }
        <EditOutlined
            onClick={() => {
              setLastHarvestVis(true);
            }}
            style={{ margin: "5px" }}
          />
          <EditLastHarvest
            userStorage={userStorage}
            plant={plant}
            lastHarvestVis={lastHarvestVis}
            setLastHarvestVis={setLastHarvestVis}
            formChanged={formChanged}
            setFormChanged={setFormChanged}
          />
        </Row>
      </div>
    );
  }

  if (plant.edible === "Non-edible" || plant.edible === undefined) {
    return (
      <div>
        <Row style={{padding: 5}}>
        <Switch onChange={onChange} />
        <Title className="rubik" level={4}>
          Non-edible
        </Title>
        <CloseCircleOutlined style={{ margin: "5px", fontSize: "17px" }}/>
        </Row>
      </div>
    );
  }

  return <></>;
};

export default Edible;
