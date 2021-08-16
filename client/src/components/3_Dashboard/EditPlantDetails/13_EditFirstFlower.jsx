import React from 'react';
import { Modal, Form, DatePicker } from "antd";
import moment from 'moment';

const EditFirstFlower = ({
  userStorage,
  plant,
  flowerVis,
  setFlowerVis,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData)
    const newDate = formData["first_flower"].format("YYYY-MM-DD")
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          first_flower: newDate
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setFlowerVis(false);
      setFormChanged(!formChanged)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
       <Modal
      visible={flowerVis}
      title="Edit Date of First Flower"
      centered
      onCancel={() => {
        setFlowerVis(false);
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
        <Form.Item name="first_flower">
        <DatePicker placeholder={moment(plant.first_flower).format("YYYY-MM-DD")} style={{width: "140px"}} />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default EditFirstFlower
