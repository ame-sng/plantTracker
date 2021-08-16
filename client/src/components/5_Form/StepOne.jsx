import React, { useState } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Button, message
} from "antd";
import { UploadOutlined} from '@ant-design/icons';

const StepOne = ({image, setImage}) => {

  const normFile = (e) => {
    console.log("Upload event: ", e);
    if (Array.isArray(e)) {
      return e
    }
    if (e.fileList.length >1){
      e.fileList.shift();
    }
    return e && e.fileList
  }
  const dummyRequest = ({file, onSuccess}) => {
    setTimeout(()=>{
      onSuccess("ok");
    }, 0)
    console.log("dummy request")
  }
  

  
  return (
    <>
      <Form.Item
        wrapperCol={{
          span: 16,
        }}
        label="Upload Image"
        name="image_upload" 
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please provide an image' }]}
      >
     {/* <input type="file" name="image_upload"/> */}
     <Upload 
     listType="picture"
     className="avatar-uploader"
      customRequest={dummyRequest}
     >
       <Button icon={<UploadOutlined />}>Click to upload</Button>
     </Upload>
      </Form.Item>
      <Form.Item label="Nickname" name="name"
      rules={[{ required: true, message: 'Please give your plant a name' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Species" name="species">
        <Input />
      </Form.Item>
      <Form.Item
        label="Date Started"
        name="date_started"
      
        rules={[
          {
            required: true,
            message: 'Please provide a start date',
            type: "object",
          },
        ]}
      >
        <DatePicker/>
      </Form.Item>
    </>
  )
}

export default StepOne
