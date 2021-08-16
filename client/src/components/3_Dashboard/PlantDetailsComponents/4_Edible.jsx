import React from 'react'
import { Typography } from 'antd';
import moment from 'moment';

const {Title, Text, Paragraph} = Typography

const Edible = ({plant}) => {

  if (plant.edible === "Edible"){
    return (
      <div>
        <h1>Edible</h1>
        <Title className="rubik" level={4}>Date Transplanted: {moment(plant.date_transplanted).format("Do MMMM YYYY")}</Title>
        <Title className="rubik" level={4}>First Flower: {moment(plant.first_flower).format("Do MMMM YYYY")}</Title>
        <Title className="rubik" level={4}>First Fruit: {moment(plant.first_fruit).format("Do MMMM YYYY")}</Title>
        <Title className="rubik" level={4}>First Harvest: {moment(plant.first_harvest).format("Do MMMM YYYY")}</Title>
        <Title className="rubik" level={4}>Last Harvest: {moment(plant.last_harvest).format("Do MMMM YYYY")}</Title>
      </div>
    )
  }

  else if (plant.edible === "Non-edible"){
    return (
      <div>
        <h1>Non-edible</h1>
      </div>
    )
  }

  return (
    <>
    </>
  )

}

export default Edible
