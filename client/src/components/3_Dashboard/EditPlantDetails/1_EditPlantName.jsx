import React from "react";
import { useHistory } from "react-router-dom";
import { Modal, Input, Form } from "antd";

const EditPlantName = ({ userStorage, plant, nameVisible, setNameVisible }) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.name)
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: formData.name
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setNameVisible(false);
      return history.push(`/dashboard/${userStorage.username}/${formData.name}`)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Modal
      visible={nameVisible}
      title="Edit Name"
      centered
      onCancel={() => {
        setNameVisible(false);
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
        <Form.Item name="name">
          <Input placeholder="New Name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPlantName;
