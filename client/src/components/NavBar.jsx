import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { HomeFilled, LoginOutlined, LogoutOutlined, SmileOutlined, SmileTwoTone } from "@ant-design/icons"
import { Menu, Select, Button } from "antd";
import { Link } from "react-router-dom";


const NavBar = ({userDeets, setUserDeets, loggedIn, setLoggedIn}) => {
  const history = useHistory();
  const [select, setSelect] = useState("")
  
  useEffect(()=>{
    const logged = localStorage.getItem("loggedIn")
    setLoggedIn(logged)
  }, [])

  const handleClick = (e) => {
    console.log("click", e);
    setSelect(e.key)
  }

if(loggedIn === true){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserDeets(userInfo)}
 

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false)
    setUserDeets({
      username:"",
      email: "",
      token: "",
      plants: [],
      _id: ""
    })
    history.push("/");
  }

  return (
    <Menu
        onClick={handleClick}
        defaultSelectedKeys={select}
        mode="horizontal"
        theme="light"
      >

        {loggedIn ? 
        (<>
        <Menu.Item key="Home" icon={<HomeFilled />} >
          <Link to ="/welcome">
          <span className="knewave">Home</span>
          </Link>
        </Menu.Item>
          <Menu.Item key="Dashboard" icon={<SmileTwoTone />} >
          <Link to ={`/dashboard/${userDeets.username}`}>
            <span className="knewave">My Babies</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="Logout" onClick = {handleLogout}>
              <Button type="primary" ghost style={{color:"#edf7ff"}}>
            <span className="knewave" ><LogoutOutlined /> Logout</span>
              </Button>
          </Menu.Item>
          </>)
        : (<>
        <Menu.Item key="Home" icon={<HomeFilled />} >
          <Link to ="/">
          <span className="knewave">Home</span>
          </Link>
        </Menu.Item>
          <Menu.Item key="Login" icon = {<LoginOutlined />}>
            <Link to ="/login">
            <span className="knewave">Login</span>
            </Link>
          </Menu.Item>
          </>)
        }

        {/* {loggedIn && (
        <Menu.Item key="Dashboard" icon={<SmileTwoTone />} >
          <Link to ={`dashboard/${userDeets.username}`}>
          <span className="knewave">My Babies</span>
          </Link>
        </Menu.Item>
        )} */}

        {/* {!loggedIn && (
        <Menu.Item key="Login" icon = {<LoginOutlined />}>
          <Link to ="/login">
          <span className="knewave">Login</span>
          </Link>
        </Menu.Item>
        )} */}
        
        {/* {loggedIn && (
        <Menu.Item key="Logout" onClick = {() => {
          localStorage.removeItem("userInfo");
          setLoggedIn(false)
          history.push("/");
          }}>
            <Button type="primary" ghost>
          <span className="knewave" ><LogoutOutlined /> Logout</span>
            </Button>
        </Menu.Item>
        )} */}
    </Menu>
  )
}

export default NavBar
