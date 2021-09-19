import React from "react";
import { Modal, Col, Row } from "antd";
import { Link } from "react-router-dom";

const Menu = ({ state, setState }) => {
  const handleOk = () => {
    setState(false);
  };

  const handleCancel = () => {
    setState(false);
  };
  let style = {
    modal: {
      width: 700,
    },
    ul: {
      listStyle: "none",
      textAlign: "left",
      fontSize: 20,
      color: "black",
      display: "flex",
      justifyContent: "center",
      height: "100%",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: 0,
    },
    li: { color: "#000", display: "flex", padding: 5 },
  };
  return (
    <>
      <Modal width={"70%"} footer={false} visible={state} onOk={handleOk} onCancel={handleCancel}>
        <Row>
          <Col span={16}>
            <p style={{ fontSize: 24 }}>
              <strong>
                Единая электронная <br /> инвестиционная платформа
              </strong>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, repudiandae? Explicabo delectus amet
              dolorum reprehenderit optio dolorem accusamus assumenda impedit cumque magni, eum rerum tenetur dolor
              blanditiis culpa vitae ducimus. Quis rem maiores numquam enim cumque at soluta veniam perferendis incidunt
              possimus ab, ad nemo nam praesentium optio accusamus nulla vero dicta provident quo ex repellat? Quaerat
              commodi fuga est?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni labore similique vero veniam ad
              perspiciatis voluptatem pariatur rerum culpa amet recusandae libero, sapiente deserunt doloribus suscipit
              vel blanditiis velit alias? Inventore quam distinctio culpa esse aut, consequuntur nesciunt tempore minus.
              Doloremque iste iusto necessitatibus, eaque, labore commodi sed totam aspernatur recusandae, neque quo
              sequi possimus reiciendis exercitationem. Sunt, similique temporibus!
            </p>
            <div>
              <Link
                to="/a"
                style={{ padding: "5px 10px", marginRight: 15, background: "violet", color: "white", fontSize: 20 }}
              >
                Стать инвестром
              </Link>
              <Link
                to="/a"
                style={{ padding: "5px 10px", marginRight: 15, background: "violet", color: "white", fontSize: 20 }}
              >
                Стать соискателем
              </Link>
            </div>
          </Col>
          <Col span={6}>
            <ul style={style.ul}>
              <li>
                <a href="/a" style={style.li}>
                  Наши премущества
                </a>
              </li>
              <li>
                <a href="/a" style={style.li}>
                  Тарифы
                </a>
              </li>
              <li>
                <a href="/a" style={style.li}>
                  Социальный проект
                </a>
              </li>
              <li>
                <a href="/a" style={style.li}>
                  Кооператив
                </a>
              </li>
              <li>
                <a href="/a" style={style.li}>
                  Инновационный проект
                </a>
              </li>
              <li>
                <a href="/a" style={style.li}>
                  Заказать обратный звонок
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default Menu;
