import React from 'react'
import { Modal, Input, Form, Radio } from "antd";

const EditSunlight = ({
  userStorage,
  plant,
  sunVisible,
  setSunVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.sunlight)
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          sunlight: formData.sunlight
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setSunVisible(false);
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Modal
      visible={sunVisible}
      title="Edit Sunlight"
      centered
      onCancel={() => {
        setSunVisible(false);
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
        <Form.Item name="sunlight">
        <Radio.Group>
          <Radio.Button value="Full Sun">Full Sun</Radio.Button>
          <Radio.Button value="Part Sun">Part Sun</Radio.Button>
          <Radio.Button value="Part Shade">Part Shade</Radio.Button>
          <Radio.Button value="Full Shade">Full Shade</Radio.Button>
        </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditSunlight
