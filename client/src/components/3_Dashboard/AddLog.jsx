import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddLog = ({ userStorage, plant, formChanged, setFormChanged , visible, setVisible}) => {
  // const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSubmit = (fieldsValue) =>{
    const formData = form.getFieldsValue(true);
    console.log("formdata: ", formData.headline)
    const values = {
      ...formData,
      pub_date: formData["pub_date"].format("YYYY-MM-DD"),
    };
    console.log("log entry: ", values)
    console.log("plantid: ", plant._id)
    fetch(`/v1/plants/log/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
            headline: values.headline,
            pub_date: values.pub_date,
            body_text: values.body_text
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      })
      .then((res)=>{
        
          console.log("res: ",res)
          // form.resetFields();
          setFormChanged(!formChanged);
          onClose();
        
        })
        .then((data)=> {
          console.log("resJson: ", data)
        })
   

  }

  return (
    <>
      <Button size="large" className="fascinate" style={{backgroundColor: "#98D1FA", borderColor: "#98D1FA", marginBottom: 8}} type="primary" onClick={showDrawer} >
        <PlusOutlined /> Add Log
      </Button>
      <Drawer
        className="knewave"
        title="Create a new log entry"
        placement="bottom"
        height="60%"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form 
        className="rubik"
        layout="vertical" 
        hideRequiredMark
        form={form}
        onFinish={handleSubmit}
        >
          <Form.Item
          name="pub_date"
          label="Date"
          rules={[{ required: true, message: 'Please add date of entry' }]}
          >
            <DatePicker style={{width: "100%"}} />
          </Form.Item>
          <Form.Item
            name="headline"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Please enter title" />
          </Form.Item>
          <Form.Item
          name="body_text"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={5}/>
          </Form.Item>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8, borderColor: "#98D1FA" }}>
              Cancel
            </Button>
            <Button className="fascinate" style={{backgroundColor: "#98D1FA", borderColor: "#98D1FA"}} htmlType="submit" type="primary" >
            Submit
          </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default AddLog;
