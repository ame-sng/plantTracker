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
      <Card title="Plant Entries">
        <Row gutter={[16, 8]}>
          <Row>
            <AddLog
              userStorage={userStorage}
              plant={plant}
              formChanged={formChanged}
              setFormChanged={setFormChanged}
              visible={visible}
              setVisible={setVisible}
            />
          </Row>
          <Row gutter={[16, 8]}>
            {plant.log_entries
              .map((entry, index) => (
                <>
                  <Col span={12}>
                    <Card
                      key={index}
                      className="rubik"
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
