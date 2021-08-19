import React from 'react'
import { Modal, Input, Form } from "antd";

const { TextArea } = Input;

const EditGrowingMedium = ({
  userStorage,
  plant,
  growVisible,
  setGrowVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.growing_medium);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          growing_medium: formData.growing_medium,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setGrowVisible(false);
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={growVisible}
        title="Edit Growing Medium"
        centered
        onCancel={() => {
          setGrowVisible(false);
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
          <Form.Item name="growing_medium">
            <TextArea rows={3} placeholder={plant.growing_medium} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditGrowingMedium
