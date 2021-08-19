import React from 'react'
import { Row, Col, Button, Image, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography

const LandingPage = () => {

  return (
    <>
    <Row justify="center" align="middle"
    style={{marginBottom: 50}}>
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
      <Row justify="center" align="middle" style={{marginBottom: 40}}>
        <Col span={9}>
          <Row justify="center">
          <Title level={2} className="knewave">Step 1</Title>
          </Row>
          <Row justify="center">
          <Image preview={false} src="https://i.imgur.com/zKRz1AX.png"/>
          </Row>
          <Row justify="center">
          <Title level={3} className="rubik">Take an image of your plant baby</Title>
          </Row>
        </Col>
      <Col span={9} >
      <Row justify="center">
      <Title level={2} className="knewave">Step 2</Title>
          </Row>
          <Row justify="center">
          <Image preview={false}  src="https://i.imgur.com/veMMO6n.png"/>
          </Row>
          <Row justify="center">
          <Title level={3} className="rubik">Enter its details into Plant Babies</Title>
          </Row>
      </Col>
      </Row>
      <Row justify="center">
      <Title level={2} className="knewave">Step 3</Title>
          </Row>
          <Row justify="center">
          <Image preview={false}  src="https://i.imgur.com/uvWD3py.png"/>
          </Row>
          <Row justify="center">
          <Title level={3} className="rubik">Watch your baby blossom and grow!</Title>
          </Row>
      </>
  )
}

export default LandingPage
