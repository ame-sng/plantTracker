import React from 'react'
import { Row, Col, Button, Image } from "antd";
import { Link } from "react-router-dom";

const LandingPagev2 = () => {
  return (
    <>
    <Row justify="center" align="middle">
        <Col span={8}>
          <Image preview={false} src="https://i.imgur.com/vyGbJXz.png"/>
        </Col>
      <Col span={8}>
      <h1 className="knewave">Provide some info about usage</h1>
      <Link to="/addplant">
        <Button type="primary" className="fascinate" size="large">
          Add Plant
          </Button>
      </Link>
      </Col>
      </Row>
      
      </>
  )
}

export default LandingPagev2
