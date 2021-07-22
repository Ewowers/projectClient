import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UnorderedListOutlined, DropboxOutlined, TeamOutlined, LoginOutlined } from "@ant-design/icons";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import axios from "axios";
import Users from "./adminComponent/Users";
import Product from "./adminComponent/Product";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const Admin = () => {
  const [red, setRed] = useState(false);
  useEffect(() => {
    axios.get("/api/auth/test").then((res) => {
      if (!res.data.status) setRed(true);
    });
  }, []);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const getUsers = (status) => {
    axios.get("/api/auth/get/" + status).then((response) => {
      setUsers(response.data);
    });
  };
  const getProduct = (type) => {
    axios.get("/api/product/get/" + type).then((response) => setProduct(response.data));
  };
  const out = () => {
    axios.post("/api/auth/out").then((res) => setRed(true));
  };
  return (
    <Layout>
      {red ? <Redirect to="/" /> : null}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log("broken", broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1">
            <Link to="/admin">Home</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Пользователи">
            <Menu.Item key="user" onClick={() => getUsers("all")}>
              <Link to="/admin/users/all">Все</Link>
            </Menu.Item>
            <Menu.Item key="user1" onClick={() => getUsers("admin")}>
              <Link to="/admin/users/admin">Админы</Link>
            </Menu.Item>
            <Menu.Item key="user2" onClick={() => getUsers("moder")}>
              <Link to="/admin/users/moder">Модераторы</Link>
            </Menu.Item>
            <Menu.Item key="user3" onClick={() => getUsers("user")}>
              <Link to="/admin/users/user">Пользователи</Link>
            </Menu.Item>
            <Menu.Item key="user4" onClick={() => getUsers("nouser")}>
              <Link to="/admin/users/nouser">Ожидающие потверждения</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<DropboxOutlined />} title="Товары">
            <Menu.Item key="product" onClick={() => getProduct("all")}>
              <Link to="/admin/product/all">Все</Link>
            </Menu.Item>
            <Menu.Item key="product1" onClick={() => getProduct("product1")}>
              <Link to="/admin/product/product1">product 1</Link>
            </Menu.Item>
            <Menu.Item key="product2" onClick={() => getProduct("product2")}>
              <Link to="/admin/product/product2">product 2</Link>
            </Menu.Item>
            <Menu.Item key="product3" onClick={() => getProduct("product3")}>
              <Link to="/admin/product/product3">product 3</Link>
            </Menu.Item>
            <Menu.Item key="product4" onClick={() => getProduct("product4")}>
              <Link to="/admin/product/product4">product 4</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="blackList" icon={<UnorderedListOutlined />}>
            Черный список
          </Menu.Item>
          <Menu.Item key="out" icon={<LoginOutlined />} onClick={out}>
            out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <Switch>
            <Route path="/admin" exact component={() => <h1>home</h1>} />
            <Route path="/admin/users/:status" exact>
              <Users array={users} get={getUsers} />
            </Route>
            <Route path="/admin/product/:type">
              <Product array={product} get={getProduct} />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
