import React from 'react';
import { Modal, Form, DatePicker } from "antd";
import moment from 'moment';

const EditFirstHarvest = ({
  userStorage,
  plant,
  firstHarvestVis,
  setFirstHarvestVis,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData)
    const newDate = formData["first_harvest"].format("YYYY-MM-DD")
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          first_harvest: newDate
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setFirstHarvestVis(false);
      setFormChanged(!formChanged)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
       <Modal
      visible={firstHarvestVis}
      title="Edit Date of First Harvest"
      centered
      onCancel={() => {
        setFirstHarvestVis(false);
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
        <Form.Item name="first_harvest">
        <DatePicker placeholder={moment(plant.first_harvest).format("YYYY-MM-DD")} style={{width: "140px"}} />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default EditFirstHarvest
