import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { HomeFilled, LoginOutlined, LogoutOutlined, SmileOutlined, SmileTwoTone } from "@ant-design/icons"
import { Menu, Select, Button } from "antd";
import { Link } from "react-router-dom";


const NavBar = () => {
  const history = useHistory();
  const [select, setSelect] = useState("")
  
  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  };
  const userStorage = getUserInfo();

  const handleClick = (e) => {
    console.log("click", e);
    setSelect(e.key)
  }
  return (
    <Menu
        onClick={handleClick}
        defaultSelectedKeys={select}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="Home" icon={<HomeFilled />} >
          <Link to ="/">
          <span className="knewave">Home</span>
          </Link>
        </Menu.Item>

        {userStorage && (
        <Menu.Item key="Dashboard" icon={<SmileTwoTone />} >
          <Link to ={"/"}>
          <span className="knewave">Babies</span>
          </Link>
        </Menu.Item>
        )}

        <Menu.Item key="Login" icon = {<LoginOutlined />}>
          <Link to ="/login">
          <span className="knewave">Login</span>
          </Link>
        </Menu.Item>
        
        {userStorage && (
        <Menu.Item key="Logout" onClick = {() => {
          localStorage.removeItem("userInfo");
          history.push("/");
          }}>
            <Button type="primary" ghost>
          <span className="knewave" ><LogoutOutlined /> Logout</span>
            </Button>
        </Menu.Item>
        )}
    </Menu>
  )
}

export default NavBar
