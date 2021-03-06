import React from 'react'
import { Modal, Form, DatePicker } from "antd";
import moment from 'moment';

const EditDateTransplanted = ({
  userStorage,
  plant,
  dateTransVis,
  setDateTransVis,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData)
    const newDate = formData["date_transplanted"].format("YYYY-MM-DD")
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          date_transplanted: newDate
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setDateTransVis(false);
      setFormChanged(!formChanged)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
       <Modal
      visible={dateTransVis}
      title="Edit Date Transplanted"
      centered
      onCancel={() => {
        setDateTransVis(false);
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
        <Form.Item name="date_transplanted">
        <DatePicker placeholder={moment(plant.date_transplanted).format("YYYY-MM-DD")} style={{width: "140px"}} />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default EditDateTransplanted
