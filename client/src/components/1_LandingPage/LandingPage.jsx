import React from 'react'
import { Row, Col, Button, Image } from "antd";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <>
    <Row justify="center" align="middle">
        <Col span={8}>
          <Image preview={false} src="https://i.imgur.com/7A0BQgU.png"/>
        </Col>
      <Col span={8}>
      <h1 className="knewave">The fuss-free way to nurture your plant babies</h1>
      <Link to="/signup">
      <Button type="primary" className="fascinate" size="large">
            Start Today
          </Button>
          </Link>
      </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={8}>
          <Row justify="center">
          <h1 className="knewave">Step 1</h1>
          </Row>
          <Row justify="center">
          <Image preview={false} src="https://i.imgur.com/zKRz1AX.png"/>
          </Row>
        </Col>
      <Col span={8}>
      <Row justify="center">
          <h1 className="knewave">Step 2</h1>
          </Row>
          <Row justify="center">
          <Image preview={false}  src="https://i.imgur.com/veMMO6n.png"/>
          </Row>
      </Col>
      </Row>
      </>
  )
}

export default LandingPage
