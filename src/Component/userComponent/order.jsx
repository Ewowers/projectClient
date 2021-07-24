import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, Input, Radio, Image, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
const Order = ({ state, setState }) => {
  console.log(state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [personal, setPersonal] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const [type, setType] = useState(false);
  form.setFieldsValue({
    phone: personal.phone,
    address: personal.address,
  });
  useEffect(() => {
    axios.post("/api/auth/getPesonalInfo").then((response) => {
      setPersonal(response.data);
    });
  }, []);
  const basket = [...state];
  const list = basket.map((item, i) => <Card item={item} key={i} setState={setState} state={state} />);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Оформить заказ
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Row>
          <Col span={12}>
            <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
              <Form.Item label="Тип доставки" name="type">
                <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
                  <Radio.Button value={true}>Доставка</Radio.Button>
                  <Radio.Button value={false}>Самовывоз</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="phone" label="Ваш телефон">
                <Input />
              </Form.Item>
              {type ? (
                <Form.Item name="address " label="Адресс доставки">
                  <Input />
                </Form.Item>
              ) : null}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>{list}</Col>
        </Row>
      </Modal>
    </>
  );
};
const Card = ({ item, state, setState }) => {
  let basket = [...state];
  const trash = () => {
    let index = basket.findIndex((elem) => item._id === elem._id);
    basket.splice(index, 1);
    setState(basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  };
  const handleChange = (value) => {
    let index = basket.findIndex((elem) => item._id === elem._id);
    basket[index].que = parseInt(value);
    setState(basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  };
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      <Image src={item.image} preview={false} width={75} height={75} alt={item.title} />
      <span
        style={{
          fontSize: 24,
          width: 150,
          paddingLeft: 10,
        }}
      >
        <strong>{item.title}</strong>
      </span>
      <InputNumber
        min="1"
        type="number"
        style={{ width: 80, textAlign: "center" }}
        defaultValue={item.que}
        onChange={handleChange}
      />
      <Button danger onClick={trash}>
        <DeleteOutlined />
      </Button>
    </div>
  );
};
export default Order;
