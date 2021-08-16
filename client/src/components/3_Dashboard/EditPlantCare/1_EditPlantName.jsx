import React from 'react'
import {  Modal, Input, Form } from "antd";

const EditPlantName = ({nameVisible, setValue, setNameVisible, value}) => {
  const [form] = Form.useForm();
  return(
    <Modal
      visible={nameVisible}
      title="Edit Name"
      centered
      onCancel={()=>{setNameVisible(false)}}
      okText="Submit"
      onOk={()=>{
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setValue({name: values.name});
            setNameVisible(false)
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      >
        <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item name="name">
        <Input placeholder="New Name"/>
        </Form.Item>
      </Form>
      </Modal>
  )
}

export default EditPlantName
