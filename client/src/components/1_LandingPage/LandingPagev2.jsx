import React from 'react'
import { Row, Col, Button, Image } from "antd";

const LandingPagev2 = () => {
  return (
    <>
    <Row justify="center" align="middle" >
        <Col span={8}>
          <Image 
          preview={false}
          height="500px"
          src="https://images.unsplash.com/photo-1597055181449-b3f17e2ada63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"/>
        </Col>
      <Col span={8}>
      <h1>The fuss-free way to nurture your plant babies</h1>
      <Button type="primary"  htmlType="submit">
            Start Today
          </Button>
      </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={8}>
          <Row justify="center">
          <h1>Step 1</h1>
          </Row>
          <Row justify="center">
          {/* <Image preview={false} src="https://i.imgur.com/zKRz1AX.png"/> */}
          </Row>
        </Col>
      <Col span={8}>
      <Row justify="center">
          <h1>Step 2</h1>
          </Row>
          <Row justify="center">
          {/* <img src="https://i.imgur.com/veMMO6n.png"/> */}
          </Row>
      </Col>
      </Row>
      </>
  )
}

export default LandingPagev2
