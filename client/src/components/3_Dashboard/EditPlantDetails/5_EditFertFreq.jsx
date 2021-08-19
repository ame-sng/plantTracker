import React from "react";
import { Modal, Input, InputNumber, Form } from "antd";

const EditFertFreq = ({
  userStorage,
  plant,
  formChanged,
  setFormChanged,
  fertVis,
  setFertVis,
  setFertDeadline
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.fertilise_freq);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          fertilise_freq: formData.fertilise_freq,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setFertVis(false);
      setFertDeadline(Date.now() + 1000 * 60 * 60 * 24 * formData.fertilise_freq)
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={fertVis}
        title="Edit Fertilising Frequency"
        centered
        onCancel={() => {
          setFertVis(false);
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
          <Form.Item label="Fertiliser Frequency">
            <span> Every </span>
            <Form.Item name="fertilise_freq" noStyle>
              <InputNumber min={0} placeholder={plant.fertilise_freq} />
            </Form.Item>
            <span> day(s)</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditFertFreq;
