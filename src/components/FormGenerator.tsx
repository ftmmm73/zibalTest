import React from "react";
import { Form, Input, Select, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

const FormGenerator = () => {
  return (
    <Form layout="vertical" style={{ maxWidth: 900 }}>
      <Form.Item
        label="مقصد تسویه"
        name="destination"
        rules={[{ required: true, message: "لطفا یک گزینه را انتخاب کنید" }]}>
        <Select>
          <Select.Option value="wallet1">کیف پول اصلی</Select.Option>
          <Select.Option value="wallet2">کیف پول اختیاری</Select.Option>
          <Select.Option value="wallet3">کیف پول تسویه</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="مبلغ تسویه"
        name="amount"
        rules={[{ required: true, message: "لطفا مبلغ را وارد کنید" }]}>
        <InputNumber<number>
          min={0}
          style={{ width: "100%" }}
          defaultValue={10000}
          formatter={(value) =>
            ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      </Form.Item>
      <Form.Item label="توضیحات (بابت)" name="description">
        <TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};
export default FormGenerator;
