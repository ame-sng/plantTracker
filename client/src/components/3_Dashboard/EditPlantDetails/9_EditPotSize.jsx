import React from 'react'
import { Modal, Input, Form, Slider } from "antd";

const EditPotSize = ({
  userStorage,
  plant,
  sizeVisible,
  setSizeVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.pot_size);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          pot_size: formData.pot_size,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setSizeVisible(false);
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={sizeVisible}
        title="Edit Pot Size (inches)"
        centered
        onCancel={() => {
          setSizeVisible(false);
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
          <Form.Item name="pot_size">
          <Slider
          min={1}
          max={20}
          marks={{
            5: 5,
            10: 10,
            15: 15,
            20: 20,
          }}
        />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditPotSize
