import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />

const Login = ({userDeets, setUserDeets, loggedIn, setLoggedIn}) => {
  // const {userDeets, setUserDeets} = useContext(LogContext);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [form] = Form.useForm();

 

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

      await fetch("/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
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
        console.log("data from login: ", data)
        setUserDeets(data)
        setLoggedIn(true)
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false);
        setShowError(false);
        form.resetFields();
        return history.push(`/welcome`)
 
        // return <Redirect to={`/dashboard/${data.username}`}/>
      })
    .catch ((error) => {
      console.log("error: ", error);
      setErrorMsg(error)
      setLoading(false);
      setShowError(true)
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
      <div className="alert">
        {showError &&(
        <Row justify="center">
          <Col>
        <Alert message={errorMsg} type="error" showIcon />
        </Col>
        </Row>
        )}
      </div>
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
        <Form.Item
        >
          {!loading && (<Button type="primary"  htmlType="submit">
            Login 
          </Button>)}
          {loading && (<Button type="primary" htmlType="submit" span={3}>
            <LoadingOutlined style={{ fontSize: 12 }} spin /> Loading
          </Button>)}
        </Form.Item>
        
        <Form.Item>
          <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
        </Form.Item>
      </Form>
      </Col>
      </Row>
    </>
  );
};

export default Login;
