import React from "react";
import { Modal, Form, Upload, Button } from "antd";
import { UploadOutlined} from '@ant-design/icons';

const EditImageUpload = ({
  userStorage,
  plant,
  imageVisible,
  setImageVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const id = plant._id
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.image_upload[0].thumbUrl);
    try {
      await fetch(`/v1/plants/${id}/image`, {
        method: "PUT",
        body: JSON.stringify({
          data: formData.image_upload[0].thumbUrl,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setImageVisible(false);
      setFormChanged(!formChanged);
      return
    } catch (error) {
      console.log(error);
      return
    }
  };

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
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              className="avatar-uploader"
              customRequest={dummyRequest}
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
