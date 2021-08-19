import React from "react";
import { Form, Input, InputNumber, Radio, Slider, DatePicker } from "antd";

const StepTwo = () => {
  return (
    <>
      <Form.Item label="Water Frequency">
        <span> Every </span>
        <Form.Item name="water_freq" noStyle>
          <InputNumber min={0} placeholder="3" />
        </Form.Item>
        <span> day(s)</span>
      </Form.Item>
      <Form.Item label="Fertilise Frequency">
        <span> Every </span>
        <Form.Item name="fertilise_freq" noStyle>
          <InputNumber min={0} placeholder="14" />
        </Form.Item>
        <span> day(s)</span>
      </Form.Item>
      <Form.Item label="Progress Track Reminder">
        <span> Every </span>
        <Form.Item name="progressTrack_freq" noStyle>
          <InputNumber min={0} placeholder="30" />
        </Form.Item>
        <span> day(s)</span>
      </Form.Item>
      <Form.Item name="sunlight" label="Sunlight">
        <Radio.Group>
          <Radio.Button value="Full Sun">Full Sun</Radio.Button>
          <Radio.Button value="Part Sun">Part Sun</Radio.Button>
          <Radio.Button value="Part Shade">Part Shade</Radio.Button>
          <Radio.Button value="Full Shade">Full Shade</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Growing Medium" name="growing_medium">
        <Input placeholder="Peat-based potting mix" />
      </Form.Item>
      <Form.Item name="location" label="Indoor or Outdoor">
        <Radio.Group>
          <Radio.Button value="Indoor">Indoor</Radio.Button>
          <Radio.Button value="Outdoor">Outdoor</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="pot_size" label="Pot Size (inches)">
        <Slider
          min={1}
          max={20}
          marks={{
            5: 5,
            10: 10,
            15: 15,
            20: 20,
          }}
        />
      </Form.Item>
      <Form.Item name="pot_drain" label="Pot Drainage">
        <Radio.Group>
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default StepTwo;
