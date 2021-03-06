import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import Upload from "../uiComponent/upload";

const PersonalAccount = () => {
  useEffect(() => {
    axios.post("/api/auth/getPesonalInfo").then((response) => {
      setPersonal(response.data);
    });
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [personal, setPersonal] = useState({});
  const [image, setImage] = useState(personal.image || null);
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  form.setFieldsValue({
    login: personal.login,
    email: personal.email,
    phone: personal.phone,
    year: moment(personal.year, dateFormat),
  });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    values.image = image;
    axios.put("/api/auth/personalInfo/" + personal._id, values).then((res) => console.log(res.data));
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Личный кабинет
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <Upload setState={setImage} state={image} avatar={personal.image} form={form} />
        <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
          <Form.Item name="login" label="Логин">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Почта">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="phone" label="Телефон">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="year" label="Дата рождения">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PersonalAccount;
