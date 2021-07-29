import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Select, Input, Form } from "antd";
import Upload from "../uiComponent/logoUpload";
import axios from "axios";
const { Option } = Select;
const Company = () => {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState({});
  const getInfo = (id) => {
    axios.get("/api/company/getOne/" + id).then((response) => setInfo(response.data));
  };
  const get = () => {
    axios.get("/api/company").then((response) => setList(response.data));
  };
  const deletes = (id) => {
    console.log(id);
    axios.delete("/api/company/" + id).then((res) => get());
  };
  const [update, setUpdate] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (id) => {
    setIsModalVisible(true);
    getInfo(id);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showUpdate = (id) => {
    setUpdate(true);
    axios.get("/api/company/getOne/" + id).then((response) => setInfo(response.data));
  };
  useEffect(get, []);
  return (
    <>
      <header style={{ marginBottom: 15 }}>
        <Create get={get} />
      </header>
      <Modal width={700} title="Show" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <img src={info.logo} alt="logo" width={300} height={100} />
        <Row style={{ margin: "15px 0" }}>
          <Col span={12} style={{ display: "grid", gridGap: 15 }}>
            <span>Название компаний:</span>
            <span>Адресс команий:</span>
            <span>Контактное лицо:</span>
            <span>Телефон контактного лица:</span>
            <span>Форма компаний</span>
            <span>Охват компаний</span>
          </Col>
          <Col span={12} style={{ display: "grid", gridGap: 15 }}>
            <span>{info.title}</span>
            <span>{info.address}</span>
            <span>{info.contactPerson}</span>
            <span>{info.phone}</span>
            <span>{info.type}</span>
            <span>{info.citiesSale}</span>
          </Col>
        </Row>
      </Modal>
      <Update update={update} setUpdate={setUpdate} info={info} get={get} />
      {list.map((item, i) => (
        <Card item={item} deletes={deletes} showModal={showModal} showUpdate={showUpdate} key={i} />
      ))}
    </>
  );
};
const Update = ({ info, update, setUpdate, get }) => {
  const handleOk = () => {
    setUpdate(false);
  };
  const handleCancel = () => {
    setUpdate(false);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    axios.put("/api/company/" + info._id, values).then((response) => get());
  };
  form.setFieldsValue({
    title: info.title,
    address: info.address,
    contactPerson: info.contactPerson,
    phone: info.phone,
    type: info.type,
    citiesSale: info.citiesSale,
  });
  return (
    <>
      <Modal width={700} visible={update} onOk={handleOk} onCancel={handleCancel}>
        <img src={info.logo} alt="logo" width={300} height={100} />
        <Row style={{ margin: "15px 0" }}>
          <Col span={24} style={{ display: "grid", gridGap: 15 }}>
            <Form form={form} name="Update" onFinish={onFinish} layout="vertical">
              <Form.Item label="Название" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Адресс" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Контактное лицо" name="contactPerson">
                <Input />
              </Form.Item>
              <Form.Item label="Контактный телефон" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Контактный телефон" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Форма компаний" name="type">
                <Select>
                  <Option value="Алма-Ата" label="Алма-Ата">
                    Алма-Ата
                  </Option>
                  <Option value="Нур-Султан" label="Нур-Султан">
                    Нур-Султан
                  </Option>
                  <Option value="Шымкент" label="Шымкент">
                    Шымкент
                  </Option>
                  <Option value="Актобе" label="Актобе">
                    Актобе
                  </Option>
                  <Option value="Караганда" label="Караганда">
                    Караганда
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Охват компаний" name="citiesSale">
                <Select mode="tags">
                  <Option value="Алма-Ата" label="Алма-Ата">
                    Алма-Ата
                  </Option>
                  <Option value="Нур-Султан" label="Нур-Султан">
                    Нур-Султан
                  </Option>
                  <Option value="Шымкент" label="Шымкент">
                    Шымкент
                  </Option>
                  <Option value="Актобе" label="Актобе">
                    Актобе
                  </Option>
                  <Option value="Караганда" label="Караганда">
                    Караганда
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
const Card = ({ item, deletes, showModal, showUpdate }) => {
  const { title, _id } = item;
  return (
    <div style={style.card}>
      <span>{title}</span>
      <div className="btn-list">
        <Button onClick={() => showModal(_id)}>Показать</Button>
        <Button style={{ margin: "0 10px" }} onClick={() => showUpdate(_id)}>
          Изменить
        </Button>
        <Button onClick={() => deletes(_id)}>Удалить</Button>
      </div>
    </div>
  );
};
const Create = ({ get }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);
  const [form, setForm] = useState({
    title: null,
    address: null,
    image: null,
    contactPerson: null,
    phone: null,
    citiesSale: null,
    type: null,
  });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    let values = { ...form, image: image };
    let statuss = false;
    for (let key in values) {
      if (values[key] === null || values[key] === "" || values[key] === " ") {
        statuss = true;
      }
    }
    if (statuss) setStatus(true);
    if (!statuss) {
      axios.post("/api/company/add", values).then((response) => get());

      setIsModalVisible(false);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Создать
      </Button>
      <Modal width={1000} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {status ? <h1>Все поля должны быть заполены</h1> : null}
        <Row gutter={16}>
          <Col span={12}>
            <div className="mb-3">
              <span>Название компаний</span>
              <Input name="title" onChange={handleChange} value={form.title} />
            </div>
            <div className="mb-3">
              <span>Адресс</span>
              <Input name="address" onChange={handleChange} value={form.address} />
            </div>
            <Upload styles={{ width: "100%", height: 120 }} setState={setImage} />
          </Col>
          <Col span={12}>
            <div className="mb-3">
              <span>Контактное лицо</span>
              <Input name="contactPerson" onChange={handleChange} value={form.contactPerson} />
            </div>
            <div className="mb-3">
              <span>Телефон</span>
              <Input name="phone" onChange={handleChange} value={form.phone} />
            </div>
            <div className="mb-3">
              <span>Города продажи</span>
              <Select
                name="citiesSale"
                mode="multiple"
                style={{ width: "100%" }}
                optionLabelProp="label"
                value={form.citiesSale}
                onChange={(value) => setForm({ ...form, citiesSale: value })}
              >
                <Option value="Алма-Ата" label="Алма-Ата">
                  Алма-Ата
                </Option>
                <Option value="Нур-Султан" label="Нур-Султан">
                  Нур-Султан
                </Option>
                <Option value="Шымкент" label="Шымкент">
                  Шымкент
                </Option>
                <Option value="Актобе" label="Актобе">
                  Актобе
                </Option>
                <Option value="Караганда" label="Караганда">
                  Караганда
                </Option>
              </Select>
            </div>
            <div className="mb-3">
              <span>Тип организаций</span>
              <Select style={{ width: "100%" }} name="type" onChange={(value) => setForm({ ...form, type: value })}>
                <Option value="TOO">ТОО</Option>
                <Option value="АОО">АОО</Option>
                <Option value="ООО">ООО</Option>
                <Option value="ИП">ИП</Option>
              </Select>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const style = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid",
    padding: 5,
    borderRadius: 5,
  },
};
export default Company;
