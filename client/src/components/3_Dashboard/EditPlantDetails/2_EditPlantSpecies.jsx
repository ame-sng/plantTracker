import React from "react";
import { Modal, Input, Form } from "antd";

const EditPlantSpecies = ({
  userStorage,
  plant,
  speciesVisible,
  setSpeciesVisible,
  formChanged,
  setFormChanged,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (fieldsValues) => {
    const formData = form.getFieldsValue(true);
    console.log("formData: ", formData.species);
    try {
      await fetch(`/v1/plants/${plant._id}`, {
        method: "PUT",
        body: JSON.stringify({
          species: formData.species,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      setSpeciesVisible(false);
      // setFormChanged(!formChanged);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        visible={speciesVisible}
        title="Edit Species"
        centered
        onCancel={() => {
          setSpeciesVisible(false);
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
          <Form.Item name="species">
            <Input placeholder={plant.species} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditPlantSpecies;
