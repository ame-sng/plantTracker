import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal, Input, Form, DatePicker, Button } from "antd";
import { useParams } from "react-router";
import moment from "moment";

const { TextArea } = Input;

const EditEntries = () => {
  const history = useHistory();
  const [form] = Form.useForm();

//*======Get User Info from Local Storage============
const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return JSON.parse(userInfo);
};
const userStorage = getUserInfo();
//*====================================================

  const { plantname, logid } = useParams();
  console.log("plantname: ", plantname)
  console.log("logid: ", logid)

  const { data, isLoading, error } = useQuery(
    ["plant"],
    () => axios(`/v1/plants/${plantname}`)
  );

  if (error) {
    console.log("error: ", error.message);
    return <h1>Error:{error.message}, try again!</h1>;
  }
  if (isLoading) {
    console.log("loading...");
    return <h1>Loading</h1>;
  }
  const plant = data?.data;
  console.log("plant: ", plant);

  const wantedLog = plant.log_entries.filter((entry)=> entry._id.toString() === logid.toString() )
  console.log("correct log: ", wantedLog)

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    const newDate = formData["pub_date"].format("YYYY-MM-DD")
    console.log("formData: ", formData);
    try {
      await fetch(`/v1/plants/log/update/${logid}`, {
        method: "PUT",
        body: JSON.stringify({
            _id: plant._id,
            headline: formData.headline,
            pub_date: newDate,
            body_text: formData.body_text
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      history.push(`/dashboard/${userStorage.username}/${plant.name}`)
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = () => {
    console.log("return clicked")
    history.push(`/dashboard/${userStorage.username}/${plant.name}`)
  }

  return (
    <div>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
          name="pub_date"
          label="Date"
          rules={[{ required: true, message: "Please enter date" }]}
          >
            <DatePicker style={{width: "100%"}} placeholder={moment(wantedLog[0].pub_date).format("DD MMM YY")}/>
          </Form.Item>
          <Form.Item
            name="headline"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder={wantedLog[0].headline} />
          </Form.Item>
          <Form.Item
          name="body_text"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={5} placeholder={wantedLog[0].body_text}/>
          </Form.Item>
          <Button htmlType="submit" type="primary" >
            Submit
          </Button>
        <Button htmlType="button" onClick={handleReturn}>
          Cancel
        </Button>
        </Form>
    </div>
  );
}

export default EditEntries
