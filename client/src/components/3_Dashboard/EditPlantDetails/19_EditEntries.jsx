import React from 'react'
import { Modal, Input, Form, DatePicker } from "antd";

const { TextArea } = Input;

const EditEntries = ({
  userStorage,
  plant,
  entryVisible,
  setEntryVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    if (formData["pub_date"]) {
      const newDate = formData["pub_date"].format("YYYY-MM-DD")
      console.log("newDate: ", newDate)
    }
    console.log("formData: ", formData);
    form.resetFields();
    // try {
    //   await fetch(`/v1/plants/${plant._id}`, {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       growing_medium: formData.growing_medium,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${userStorage.token}`,
    //     },
    //   });
    //   form.resetFields();
    //   setGrowVisible(false);
    //   setFormChanged(!formChanged);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div>
      <Modal
        visible={entryVisible}
        title="Edit Log Entry"
        centered
        onCancel={() => {
          setEntryVisible(false);
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
          name="pub_date"
          label="Date"
          rules={[{ required: true, message: "Please enter date" }]}
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
        </Form>
      </Modal>
    </div>
  );
}

export default EditEntries
