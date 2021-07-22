import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, Image } from "antd";
import { useParams } from "react-router-dom";
import Upload from "../uiComponent/upload";
import axios from "axios";
const { Option } = Select;
const Product = ({ array, get }) => {
  const [state, setState] = useState("");
  const { type } = useParams();
  const gets = () => get(type);
  const list = array.map((item, i) => <Card key={i} item={item} i={i} />);
  return (
    <>
      <header>
        <Create state={state} setstate={setState} get={gets} />
      </header>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{list}</div>
    </>
  );
};
const Card = ({ item }) => {
  const { title, prise, type, image } = item;
  return (
    <div style={{ width: 300 }}>
      <Image src={image} style={{ width: "100%", height: 300 }} />
      <p>
        <strong>{title}</strong>
      </p>
      <p>{prise} тг</p>
      <span>
        категория/{type}/{title}
      </span>
    </div>
  );
};
const Create = ({ state, setstate, get }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alert, setAlert] = useState(null);
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
    values.image = state;
    axios.post("/api/product/add", values).then((response) => {
      if (!response.data.status) setAlert({ message: "Данное название занято", color: "red" });
      else {
        setAlert({ message: "Товар создан", color: "green" });
        get();
      }
    });
  };
  return (
    <>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {alert === null ? null : <div style={{ ...style.alert, background: alert.color }}>{alert.message}</div>}
        <Upload setState={setstate} state={state} />
        <Form name="control-hooks" onFinish={onFinish}>
          <span>Название</span>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Пожалуйста заполните название",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <span>Цена</span>
          <Form.Item
            name="prise"
            rules={[
              {
                required: true,
                message: "Пожалуйста заполните цену",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <span>Тип</span>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: "пожалуйста выберите тип",
              },
            ]}
          >
            <Select allowClear>
              <Option value="product1">product 1</Option>
              <Option value="product2">product 2</Option>
              <Option value="product3">product 3</Option>
              <Option value="product4">product 4</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        Создать продукт
      </Button>
    </>
  );
};
const style = {
  alert: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    textAlign: "center",
    color: "#fff",
  },
};
export default Product;
