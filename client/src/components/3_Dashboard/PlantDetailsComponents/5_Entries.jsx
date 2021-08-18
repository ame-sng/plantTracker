import React, { useState } from "react";
import { Typography, Card, Row, Col, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import moment from "moment";
import EditEntries from "../EditPlantDetails/19_EditEntries";

const { Title, Text } = Typography;
const { Meta } = Card;

const Entries = ({ userStorage, plant, formChanged, setFormChanged }) => {
const [entryVisible, setEntryVisible] = useState(false)

const handleVisible = () =>{
  setEntryVisible(true)
}

  function confirm(e) {
    handleDelete(e);
    message.success("Deleted");
  }

  const handleDelete = (logId) => {
    const id = plant._id
    console.log("log id: ", logId);
    console.log("plant id: ", id)
    fetch(`/v1/plants/log/delete/${logId}`, {
      method: "PUT",
       body: JSON.stringify({
      _id : id,
       }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStorage.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setFormChanged(!formChanged);
          return res.json();
        }
        throw new Error("Error in network");
      })
      .then((resJson) => {
        console.log("resJson: ", resJson);
      });
  };
  return (
    <div>
      <Card title="Plant Entries">
        <Row gutter={[16, 8]}>
          {plant.log_entries.map((entry, index) => (
            <>
              <Col span={12}>
                <Card 
                key={index}
                className="rubik" 
                title={entry.headline} 
                actions={[
                  <EditOutlined key="edit" onClick={handleVisible}/>,
                  <Popconfirm
                      title="Are you sure to delete this plant?"
                      onConfirm={() => confirm(entry._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>,
                ]}
                extra={moment(entry.pub_date).format("DD MMM YY")} 
                >
                  <Text className="rubik">{entry.body_text}</Text>
                  <EditEntries 
                  userStorage={userStorage}
                  plant={plant}
                  entryVisible={entryVisible}
                  setEntryVisible={setEntryVisible}
                  formChanged={formChanged}
                  setFormChanged={setFormChanged}
                  />
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
