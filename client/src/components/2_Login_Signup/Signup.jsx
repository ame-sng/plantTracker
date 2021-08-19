import React, { useState, useEffect, useContext } from 'react';
import { LogContext } from "../../LogContext";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const Signup = ({userDeets, setUserDeets, loggedIn, setLoggedIn}) => {
  // const {userDeets, setUserDeets} = useContext(LogContext);
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo)
      console.log(user)
      history.push(`/dashboard/${user.username}`)
    }
  }, [history, loggedIn])


  const onFinish = async (fieldsValue) => {
    console.log(fieldsValue);
    const values = fieldsValue;
    setLoading(true);

      await fetch("/v1/users/", {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if(res.ok) {
          return res.json()
        }
        throw new Error("Error in network")
      })
      .then((data) => {
        console.log(data)
        setUserDeets(data)
        setLoggedIn(true)
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false);
        form.resetFields();
        localStorage.setItem("loggedIn", loggedIn)
        return history.push(`/welcome}`)

      })
    .catch ((error) => {
      console.log("error: ", error);
    })
  };


  return (
    <>
     <Row justify="center" align="middle">
        <Col span={8}>
          {/* <Image /> */}
          <img src="https://i.imgur.com/7A0BQgU.png"/>
        </Col>
      <Col span={8}>
      <Form
        form={form}
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
      </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item >
          <Button type="primary"  htmlType="submit">
           Sign Up
          </Button>
        </Form.Item>
        
        <Form.Item>
        <Link to="/login" >
        {"Already have an account? Log In"}
      </Link>
        </Form.Item>
      </Form>
      </Col>
      </Row>
    </>
  )
}

export default Signup
