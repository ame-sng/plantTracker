import React, { useState} from "react";
import { Typography, Row, Modal, Button, Input, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import EditPlantName from "../EditPlantCare/1_EditPlantName";

const { Title } = Typography;

const NameSpeciesDate = ({plant, value, setValue}) => {
  const [nameVisible, setNameVisible]= useState(false);
  const [speciesVisible, setSpeciesVisible]= useState(false);
  const [loading, setLoading] = useState(false);
  

  const speciesChange = () => {
    console.log("edit")
    setSpeciesVisible(true)
  }

    const speciesHandleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSpeciesVisible(false);
      }, 500);
  };

  // const onFinishName = (fieldValues) => {
  //   console.log(fieldValues)
  //   setValue({name: fieldValues.name})
  // }

  const onFinishSpecies = (fieldValues) => {
    console.log(fieldValues)
    setValue({species: fieldValues.species})
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const speciesHandleCancel = () => {
    setSpeciesVisible(false)
  };

  return (
    <div>
      <Row>
      <Title className="knewave">{plant.name}</Title> <EditOutlined onClick={()=>{setNameVisible(true)}} style={{ fontSize: "18px", margin: "5px" }} />
      <EditPlantName nameVisible={nameVisible} setNameVisible={setNameVisible} setValue={setValue} />
      </Row>

      <Row>
      {plant.species && (
        <>
        <Title className="rubik" level={3}>
          Species: {plant.species}
        </Title> <EditOutlined onClick={speciesChange} style={{ margin: "5px" }} />
        </>
      )}
      
      <Modal
      visible={speciesVisible}
      title="Edit Species"
      centered
      onCancel={speciesHandleCancel}
      footer={null}
      >
        <Form
        onFinish={onFinishSpecies}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item name="species">
        <Input placeholder="Input Species"></Input>
          </Form.Item>
          <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading} onClick={speciesHandleOk}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </Row>

      <Title className="rubik" level={4}>
        Date Started: {moment(plant.date_started).format("Do MMMM YYYY")}
      </Title>

    </div>
  );
};

export default NameSpeciesDate;
