import React from 'react';
import { Modal, Form, DatePicker } from "antd";
import moment from 'moment';


const EditLastHarvest = ({
  userStorage,
  plant,
  lastHarvestVis,
  setLastHarvestVis,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData)
    const newDate = formData["last_harvest"].format("YYYY-MM-DD")
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          last_harvest: newDate
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setLastHarvestVis(false);
      setFormChanged(!formChanged)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
       <Modal
      visible={lastHarvestVis}
      title="Edit Date of Last Harvest"
      centered
      onCancel={() => {
        setLastHarvestVis(false);
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
        <Form.Item name="last_harvest">
        <DatePicker placeholder={moment(plant.last_harvest).format("YYYY-MM-DD")} style={{width: "140px"}} />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default EditLastHarvest
