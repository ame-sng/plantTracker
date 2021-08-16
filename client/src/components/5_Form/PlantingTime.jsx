import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Image } from "antd";

const PlantingTime = ({ prev }) => {
  return (
    <>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button style={{ margin: "0 8px" }} onClick={prev}>
          Previous
        </Button>
        <Button htmlType="submit" type="primary" >
          Add Plant
        </Button>
      </Form.Item>
      <Image preview={false} src="https://i.imgur.com/bZXZHhM.png" />
      <h1>Time to watch your baby grow! </h1>
    </>
  );
};

export default PlantingTime;
