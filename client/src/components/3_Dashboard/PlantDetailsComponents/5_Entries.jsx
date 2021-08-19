import React, { useState } from "react";
import { Typography, Card, Row, Col, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import EditEntries from "../EditPlantDetails/19_EditEntries";
import { Link } from "react-router-dom";
import AddLog from "../AddLog";

const { Title, Text } = Typography;

const Entries = ({
  userStorage,
  plant,
  formChanged,
  setFormChanged,
  visible,
  setVisible,
}) => {
  function confirm(e) {
    handleDelete(e);
    message.success("Deleted");
  }
  const id = plant._id;

  const handleDelete = (logId) => {
    console.log("log id: ", logId);
    console.log("plant id: ", id);
    fetch(`/v1/plants/log/delete/${logId}`, {
      method: "PUT",
      body: JSON.stringify({
        _id: id,
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
      <Card title="Plant Entries" className="knewave" style={{borderColor: "#eaf2f7"}} 
      headStyle={{fontFamily: "fascinate", fontSize: 35, color: "#f99f81", textShadow: "1px 2px 3px #FDE84D"}}>
            <AddLog
              userStorage={userStorage}
              plant={plant}
              formChanged={formChanged}
              setFormChanged={setFormChanged}
              visible={visible}
              setVisible={setVisible}
            />
        <Row gutter={[16, 8]}>
            {plant.log_entries
              .map((entry, index) => (
                <>
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                    <Card
                      key={index}
                      headStyle={{fontFamily: "knewave", backgroundColor: "#eaf2f7", borderColor: "#fff"}}
                      className="rubik"
                      style={{backgroundColor: "#eaf2f7" }} //
                      title={entry.headline}
                      
                      actions={[
                        <Link
                          to={{
                            pathname: `/dashboard/${userStorage.username}/${plant.name}/${entry._id}`,
                          }}
                        >
                          <EditOutlined key="edit" />
                        </Link>,

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
                    </Card>
                </Col>
                </>
              ))
              .reverse()}
        </Row>
      </Card>
    </div>
  );
};

export default Entries;

{
  /* <EditEntries
    userStorage={userStorage}
    plant={plant}
    entryVisible={entryVisible}
    setEntryVisible={setEntryVisible}
    formChanged={formChanged}
    setFormChanged={setFormChanged}
    entry={entry}
    />  */
}
