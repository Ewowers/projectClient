import React, { useState, useEffect } from "react";
import { PageHeader, Button, Row, Col, Menu, Layout, notification } from "antd";
import { DropboxOutlined, LaptopOutlined, NotificationOutlined, HeartOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import axios from "axios";
import PersonalAccount from "./userComponent/personalAccount";
import Basket from "./userComponent/basket";
import Order from "./userComponent/order";
const { SubMenu } = Menu;
const { Sider } = Layout;
const User = () => {
  const [red, setRed] = useState(false);
  const [product, setProduct] = useState([]);
  const [localstorage, setsocalstorage] = useState(JSON.parse(localStorage.getItem("basket")) || []);
  useEffect(() => {
    axios.get("/api/auth/test").then((res) => {
      if (!res.data.status) setRed(true);
    });
  }, []);
  const get = (type) => {
    axios.get("/api/product/get/" + type).then((response) => {
      setProduct(response.data);
    });
  };
  const out = () => {
    axios.post("/api/auth/out").then((res) => setRed(true));
  };
  const BTNLIST = () => {
    return (
      <>
        <Basket key={1} state={localstorage} setState={setsocalstorage} />,
        <Order kye={2} state={localstorage} setState={setsocalstorage} />,
        <PersonalAccount key={3} state={localstorage} setState={setsocalstorage} />,
        <Button key={4} type="danger" onClick={out}>
          Выйти
        </Button>
        ,
      </>
    );
  };
  const list = product.map((item, i) => <Card item={item} key={i} state={localstorage} setState={setsocalstorage} />);
  return (
    <>
      {red ? <Redirect to="/" /> : null}
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Title"
        subTitle="This is a subtitle"
        extra={<BTNLIST />}
      />

      <Row>
        <Col span={3}>
          <Sider width={"100%"} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="product" icon={<DropboxOutlined />} title="Католог">
                <Menu.Item key="Product0" onClick={() => get("all")}>
                  product all
                </Menu.Item>
                <Menu.Item key="Product1" onClick={() => get("product1")}>
                  Product 1
                </Menu.Item>
                <Menu.Item key="Product2" onClick={() => get("product2")}>
                  Product 2
                </Menu.Item>
                <Menu.Item key="Product3" onClick={() => get("product3")}>
                  Product 3
                </Menu.Item>
                <Menu.Item key="Product4" onClick={() => get("product4")}>
                  Product 4
                </Menu.Item>
              </SubMenu>
              <SubMenu key="history" icon={<LaptopOutlined />} title="Заказы">
                <Menu.Item key="falow">Желаемое</Menu.Item>
                <Menu.Item key="historyShop">История покупок</Menu.Item>
                <Menu.Item key="7"></Menu.Item>
                <Menu.Item key="8"></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </Col>
        <Col span={21} style={{ padding: 15 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 300px)", gridGap: 15 }}>{list}</div>
        </Col>
      </Row>
    </>
  );
};

const Card = ({ item, state, setState }) => {
  const { title, prise, type, image } = item;
  const openNotification = () => {
    notification.open({
      message: title + " добавлен в корзину",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
    add();
  };
  const add = () => {
    let basket = [...state];
    let obj = {
      ...item,
      que: 1,
    };
    if (basket.find((item) => item._id === obj._id)) basket.find((item) => item._id === obj._id).que += 1;
    else basket.push(obj);
    setState(basket);
    localStorage.setItem("basket", JSON.stringify(state));
  };
  return (
    <div style={{ width: 300, border: "1px solid", padding: 5, borderRadius: 10 }}>
      <img src={image} style={{ width: "100%", height: 290 }} alt="1" />
      <p>
        <strong>{title}</strong>
      </p>
      <p>{prise} тг</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>
          категория/{type}/{title}
        </span>
        <div>
          <Button type="ghost">
            <HeartOutlined />
          </Button>
          <Button type="primary" onClick={openNotification}>
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
};
export default User;
