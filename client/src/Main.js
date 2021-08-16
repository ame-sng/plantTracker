import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './components/1_LandingPage/LandingPage';
import LandingPagev2 from './components/1_LandingPage/LandingPagev2';
import Login from "./components/2_Login_Signup/Login";
import Signup from './components/2_Login_Signup/Signup';
import AddPlant from './components/5_Form/AddPlant';
import AllPlants from './components/3_Dashboard/AllPlants';
import PlantDetails from './components/3_Dashboard/PlantDetails';

const Main = () => {

  return (
    <main>
      <Switch>
        <Route exact path="/">
          {/* MAIN */}
          {/* <h1 style={{fontFamily: "'Fascinate', cursive"}}>MAIN PAGE</h1> */}
          <LandingPage />
          {/* <LandingPagev2 /> */}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/addplant">
          <AddPlant />
        </Route>
        <Route path="/dashboard/:username/:name">
          <PlantDetails />
        </Route>
        <Route path="/dashboard/:username" >
          <AllPlants />
        </Route>
      </Switch>
    </main>
  )
}

export default Main
