import React, { useState, useContext } from "react";
import { LogContext } from "../../LogContext";
import { useHistory } from "react-router-dom";
import { Steps, Form, Button, Upload } from "antd";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import PlantingTime from "./PlantingTime";

const { Step } = Steps;

const AddPlant = ({ userDeets }) => {
  // const {userDeets, setUserDeets} = useContext(LogContext);
  // console.log("userDeets addplant: ", userDeets)
  const history = useHistory();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [image, setImage] = useState("");

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  };

  // console.log("AddPlant userDeets: ", userDeets)

  const onFinish = async (fieldsValue) => {
    const formData = form.getFieldsValue(true);
    const values = {
      ...formData,
      date_started: formData["date_started"].format("YYYY-MM-DD"),
    };
    const userStorage = getUserInfo();
    console.log("Add Plant userStorage: ", userStorage);
    console.log("values:", values);
    console.log("image uploadvalues:", values.image_upload);

    try {
      await fetch("/v1/plants/upload", {
        method: "POST",
        body: JSON.stringify({
          data: image,
          name: values.name,
          species: values.species,
          date_started: values.date_started,
          water_freq: values.water_freq,
          fertilise_freq: values.fertilise_freq,
          progressTrack_freq: values.progressTrack_freq,
          sunlight: values.sunlight,
          growing_medium: values.growing_medium,
          location: values.location,
          pot_size: values.pot_size,
          pot_drain: values.pot_drain,
          method: values.method,
          edible: values.edible,
          posted_by: userStorage._id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStorage.token}`,
        },
      });
      form.resetFields();
      return history.push(`/dashboard/${userStorage.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const skip = () => {
    setCurrent(steps.length - 1);
  };

  const steps = [
    {
      title: "Give your plant a name",
      content: <StepOne image={image} setImage={setImage} />,
    },
    {
      title: "Customise care",
      content: <StepTwo />,
    },
    {
      title: "Edibles/Non-edibles",
      content: <StepThree />,
    },
    {
      title: "Add Plant",
      content: <PlantingTime prev={prev} />,
    },
  ];

  return (
    <>
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={form}
        name="addplant"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && current < steps.length - 1 && (
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button style={{ margin: "0 8px" }} type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current > 0 && current < steps.length - 2 && (
            <Button style={{ margin: "0 8px" }} type="primary" onClick={skip}>
              Skip
            </Button>
          )}
          {/* {current === steps.length - 1 && (
          <Button htmlType="submit" type="primary" >
            Add Plant
          </Button>
        )} */}
        </div>
      </Form>
    </>
  );
};

export default AddPlant;
