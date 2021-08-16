import React from 'react'
import { Modal, Input, Form } from "antd";

const EditMethod = ({
  userStorage,
  plant,
  methodVis,
  setMethodVis,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.method);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          method: formData.method
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setMethodVis(false);
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={methodVis}
        title="Edit Method of Propagation"
        centered
        onCancel={() => {
          setMethodVis(false);
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
          <Form.Item name="method">
            <Input placeholder={plant.method} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditMethod
