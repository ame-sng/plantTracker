import React, { useState } from "react";
import { Modal, Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditImageUpload = ({
  userStorage,
  plant,
  imageVisible,
  setImageVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();
  const [imageInfo, setImageInfo] = useState("")

  const handleSubmit = async (fieldsValues) => {
    const id = plant._id;
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData)
    // console.log("formData: ", formData.image_upload[0].thumbUrl);
    try {
      await fetch(`/v1/plants/${id}/image`, {
        method: "PUT",
        body: JSON.stringify({
          data: imageInfo,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setImageVisible(false);
      setFormChanged(!formChanged);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleUpload = (file) => {
    console.log("file: ", file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log("readerresult: ", reader.result)
      setImageInfo(reader.result)
    };
    reader.onerror = () => {
      console.error("Something went wrong");
    };
  }

  // const normFile = (e) => {
  //   console.log("Upload event: ", e);
  //   if (Array.isArray(e)) {
  //     console.log("fileList: ", e)
  //     return e;
  //   }
  //   if (e.fileList.length > 1) {
  //     e.fileList.shift();
  //   }
  //   console.log("event: ", e)
  //   console.log("fileList: ", e.fileList)
  //   return e && e.fileList;
  // };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
    console.log("dummy request");
  };

  return (
    <div>
      <Modal
        visible={imageVisible}
        title="Add Image"
        centered
        onCancel={() => {
          setImageVisible(false);
        }}
        okText="Submit"
        onOk={handleSubmit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="image_upload"
            // valuePropName="fileList"
            // getValueFromEvent={handleUpload}
          >
            <Upload
              listType="picture"
              className="avatar-uploader"
              beforeUpload={handleUpload}
              // customRequest={dummyRequest}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditImageUpload;
