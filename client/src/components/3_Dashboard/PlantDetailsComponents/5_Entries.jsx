import React, { useState } from "react";
import { Typography, Card, Row, Col } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const Entries = ({ userStorage, plant, formChanged, setFormChanged }) => {


  return (
    <div>
      <Card title="Plant Entries">
        <Row gutter={[16, 8]}>
          {plant.log_entries.map((entry, index) => (
            <>
              <Col span={12}>
                <Card className="rubik" title={entry.headline} extra={moment(entry.pub_date).format("DD MMM YY")} hoverable >
                  <Text className="rubik">{entry.body_text}</Text>
                </Card>
              </Col>
            </>
          )).reverse()}
        </Row>
      </Card>
    </div>
  );
};

export default Entries;
