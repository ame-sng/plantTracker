import React from 'react'
import { Row, Col, Button, Image } from "antd";
import { Link } from "react-router-dom";

const LandingPagev2 = () => {
  return (
    <>
    <Row justify="center" align="middle">
        <Col span={9}>
          <Image height={600} preview={false} src="https://i.imgur.com/vyGbJXz.png"/>
        </Col>
      <Col span={6}>
      <h1 className="knewave">Track your plant babies' progress and journal their growth</h1>
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
