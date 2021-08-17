import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LogContext } from "./LogContext";

import { Layout } from "antd";
import "./App.css";
import { Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import Main from "./Main";

const { Header, Content, Footer } = Layout;

function App() {
  const queryClient = new QueryClient();
  const [userDeets, setUserDeets] = useState({
    username:"",
    email: "",
    token: "",
    plants: [],
    _id: ""
  });
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LogContext.Provider value={{ userDeets, setUserDeets }}>
        <Layout className="layout">
          <Header className="ant-layout-header">
            <Link to="/">
              <img src="https://i.imgur.com/ZVDDu0K.png" className="logo" />
            </Link>
            <NavBar userDeets={userDeets} setUserDeets={setUserDeets} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div style={{ margin: "16px 0" }} />
            <div className="site-layout-content">
              <Main userDeets={userDeets} setUserDeets={setUserDeets} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Plant Babies, Created by Amelia Sng
          </Footer>
        </Layout>
      </LogContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
