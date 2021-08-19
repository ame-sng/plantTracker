import React from "react";
import { Modal, Input, InputNumber, Form } from "antd";

const EditProgressFreq = ({
  userStorage,
  plant,
  formChanged,
  setFormChanged,
  progVis,
  setProgVis,
  setProgressDeadline
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.progressTrack_freq);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          progressTrack_freq: formData.progressTrack_freq,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setProgVis(false);
      setProgressDeadline(Date.now() + 1000 * 60 * 60 * 24 * formData.progressTrack_freq)
      setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={progVis}
        title="Edit Progress Track Frequency"
        centered
        onCancel={() => {
          setProgVis(false);
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
          <Form.Item label="Progress Track Frequency">
            <span> Every </span>
            <Form.Item name="progressTrack_freq" noStyle>
              <InputNumber min={0} placeholder={plant.progressTrack_freq} />
            </Form.Item>
            <span> day(s)</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProgressFreq;
