import React from 'react';
import { Typography, Row } from 'antd';

const {Title, Text, Paragraph} = Typography

const Environment = ({plant}) => {

    return (
      <div>
        <Row>
        {plant.sunlight ? 
        <Title className="rubik" level={4}>Sunlight: {plant.sunlight}</Title>
         : <Title className="rubik" level={4}>Sunlight not provided</Title>}
        </Row>
        <Row>
          {plant.growing_medium ?
        <Title className="rubik" level={4}>Growing Medium: {plant.growing_medium}</Title>
          : <Title className="rubik" level={4}>Growing Medium not provided</Title>}
        </Row>
        <Row>
          {plant.pot_size ? 
        <Title className="rubik" level={4}>Pot Size: {plant.pot_size}in</Title>
          : <Title className="rubik" level={4}>Pot Size not provided</Title>}
        </Row>
        <Row>
          {plant.pot_drain ? <Title className="rubik" level={4}>Pot Drainage: {plant.pot_drain ? "Yes" : "No"}</Title> : <Title className="rubik" level={4}>Pot Drainage not provided</Title>}
        
        </Row>
      </div>
    )
  
  
}

export default Environment
