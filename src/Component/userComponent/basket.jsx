import React, { useState } from "react";
import { Drawer, Button, Image, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../Admin.css";
const Basket = ({ state, setState }) => {
  const [visible, setVisible] = useState(false);
  const list = state.map((item, i) => <Card item={item} key={i} setState={setState} state={state} />);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Корзина
      </Button>
      <Drawer width={500} title="Корзина" placement="right" closable={false} onClose={onClose} visible={visible}>
        <div className="scrollBar">{list}</div>
      </Drawer>
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
      <Image src={item.image} preview={false} width={150} height={150} alt={item.title} />
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
export default Basket;
