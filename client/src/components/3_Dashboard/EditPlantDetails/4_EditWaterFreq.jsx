import React from "react";
import { Modal, Input, InputNumber, Form } from "antd";

const EditWaterFreq = ({
  userStorage,
  plant,
  formChanged,
  setFormChanged,
  waterVis,
  setWaterVis,
  setWaterDeadline
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.water_freq);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          water_freq: formData.water_freq,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setWaterVis(false);
      setWaterDeadline(Date.now() + 1000 * 60 * 60 * 24 * formData.water_freq)
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={waterVis}
        title="Edit Water Frequency"
        centered
        onCancel={() => {
          setWaterVis(false);
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
          <Form.Item label="Water Frequency">
            <span> Every </span>
            <Form.Item name="water_freq" noStyle>
              <InputNumber min={0} placeholder={plant.water_freq} />
            </Form.Item>
            <span> day(s)</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditWaterFreq;
