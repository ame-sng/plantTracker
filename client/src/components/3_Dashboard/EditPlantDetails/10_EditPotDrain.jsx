import React from 'react'
import { Modal, Input, Form, Radio } from "antd";

const EditPotDrain = ({
  userStorage,
  plant,
  drainVisible,
  setDrainVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.pot_drain);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          pot_drain: formData.pot_drain,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setDrainVisible(false);
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={drainVisible}
        title="Edit Pot Drainage"
        centered
        onCancel={() => {
          setDrainVisible(false);
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
          <Form.Item name="pot_drain">
          <Radio.Group>
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditPotDrain
