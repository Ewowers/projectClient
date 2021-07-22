import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
const { TabPane } = Tabs;
const Auth = () => {
  return (
    <div style={style.body}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Воити" key="1">
          <Authorization />
        </TabPane>
        <TabPane tab="Регистрация" key="2">
          <Register />
        </TabPane>
      </Tabs>
    </div>
  );
};
const Authorization = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState({ status: false });
  useEffect(() => {
    axios.post("/api/auth/onload").then((res) => {
      if (res.data.status) setUrl({ status: true, url: res.data.url });
    });
  }, []);
  const onFinish = (values) => {
    console.log("Success:", values);
    axios.post("/api/auth/authorization", values).then((res) => {
      if (!res.data.status) setErrorMessage(res.data.message);
      else setUrl({ status: true, url: "/" + res.data.url });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      style={{ width: 400 }}
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {url.status === true ? <Redirect to={url.url} /> : null}
      <h2 style={{ textAlign: "center" }}>{errorMessage}</h2>
      <Form.Item label="Логин" name="login" rules={[{ required: true, message: "Пожалуйста, введите ваш логин!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Пороль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите свой пароль!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [finish, setFinish] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
    axios.post("/api/auth/register", values).then((res) => {
      if (!res.data.status) setErrorMessage(res.data.message);
      else setFinish(true);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      style={{ width: 400 }}
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {finish ? (
        <h1>Ваша заявка принята пожалуйста дождитесь потверждения от администраций</h1>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>{errorMessage}</h2>
          <Form.Item label="Логин" name="login" rules={[{ required: true, message: "Пожалуйста, введите ваш логин!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Пороль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите свой пароль!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
const style = {
  body: {
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default Auth;
