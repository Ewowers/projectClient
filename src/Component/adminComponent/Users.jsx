import React, { useState } from "react";
import { Button, Modal, Input, Select, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
const { Option } = Select;
const Users = ({ array, get }) => {
  const { status } = useParams();
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    axios.get("/api/auth/user/" + id).then((res) => {
      setUser(res.data);
      setIsModalVisible(true);
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deletes = (id) => {
    axios.delete("/api/auth/" + id).then((res) => get(status));
  };
  const youImportant = 5;
  let list = array.map((item, i) => {
    return (
      <Card
        login={item.login}
        id={item._id}
        key={i}
        deletes={deletes}
        important={item.important}
        status={item.position}
        youImportant={youImportant}
        show={showModal}
      />
    );
  });
  return (
    <>
      {list}
      <Modal footer={false} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Put user={user} get={get} />
      </Modal>
    </>
  );
};
const Card = ({ show, login, id, deletes, important, status, youImportant }) => {
  let i = false;
  if (login !== "admin") i = true;
  if (important <= youImportant)
    return (
      <div style={styles.card}>
        <div style={{ display: "flex" }}>
          <span style={styles.p}>
            name: <strong>{login}</strong>
          </span>
          <span style={styles.p}>
            status: <strong>{status}</strong>
          </span>
        </div>
        {i ? (
          <div style={styles.btnList}>
            <Button type="danger">Бан</Button>
            <Button type="danger" onClick={() => deletes(id)}>
              Удалить
            </Button>
            <Button onClick={() => show(id)} type="primary">
              Изменить
            </Button>
          </div>
        ) : null}
      </div>
    );
};
const Put = ({ user, get }) => {
  const [form] = Form.useForm();
  const { status } = useParams();
  const onFinish = (values) => {
    console.log(values);
    axios.put("/api/auth/" + user._id, values).then((res) => {
      get(status);
    });
  };

  form.setFieldsValue({
    login: user.login,
    password: user.password,
    position: user.position,
  });
  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="login">
        <Input />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item name="position">
        <Select allowClear>
          <Option value="admin">admin</Option>
          <Option value="moder">moder</Option>
          <Option value="user">user</Option>
          <Option value="nouser"></Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const styles = {
  card: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    border: "1px solid",
    marginBottom: 5,
  },
  p: {
    width: 200,
    display: "block",
  },
  btnList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: 10,
  },
};
export default Users;
