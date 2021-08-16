import React from 'react'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Slider,
  DatePicker,
} from "antd";

const StepThree = () => {
  return (
    <>
    <Form.Item
      name="edible"
      label="Edible or Non-edible">
      <Radio.Group>
          <Radio.Button value="Edible">Edible</Radio.Button>
          <Radio.Button value="Non-edible">Non-edible</Radio.Button>
        </Radio.Group>
      </Form.Item>
    <Form.Item label="Propagation Method" name="method">
        <Input placeholder="Seed/Cutting"/>
      </Form.Item>
    </>
  )
}

export default StepThree
