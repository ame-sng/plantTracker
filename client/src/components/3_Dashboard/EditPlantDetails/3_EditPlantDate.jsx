import React from 'react'
import { Modal, Input, Form, DatePicker } from "antd";
import moment from 'moment';

const EditPlantDate = ({ userStorage, plant, dateStartVisible, setDateStartVisible, formChanged, setFormChanged }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData)
    const newDate = formData["date_started"].format("YYYY-MM-DD")
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          date_started: newDate
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setDateStartVisible(false);
      setFormChanged(!formChanged)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
       <Modal
      visible={dateStartVisible}
      title="Edit Date Started"
      centered
      onCancel={() => {
        setDateStartVisible(false);
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
        <Form.Item name="date_started">
        <DatePicker placeholder={moment(plant.date_started).format("YYYY-MM-DD")} style={{width: "140px"}} />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default EditPlantDate
