import React, { useRef, useState } from "react";
import { MenuOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import "../Styles/Home.css";
import Footer from "./Footer";
import Menu from "./Menu";
import lang from "../language/Home";
const Header = () => {
  const [state, setState] = useState(false);
  return (
    <div className="header">
      <span style={{ fontSize: 24 }} onClick={() => setState(true)}>
        <MenuOutlined /> МЕНЮ
      </span>
      <h1 className="logo">INVESTGROUP</h1>
      <div className="contact">
        <a href="tel:+77003773773" style={{ color: "black" }}>
          8 (700) 377 37 73
        </a>
        <a href="tel:+77003773773" style={{ color: "black" }}>
          8 (700) 377 37 73 (Для РФ)
        </a>
      </div>
      <Menu state={state} setState={setState} />
    </div>
  );
};
const Slider = ({ array }) => {
  const listen = array;
  const carousel = useRef(null);
  const handleNext = () => carousel.current.next();
  const handlePrev = () => carousel.current.prev();
  const list = listen.map((item, i) => {
    return (
      <div key={i}>
        <h3 style={{ fontSize: 30 }}>{item.title}</h3>
        <p style={{ margin: 0, fontSize: 24 }}>{item.description}</p>
      </div>
    );
  });

  return (
    <div className="slider-container-my-project" style={{ width: "60%", position: "relative" }}>
      <Carousel id="carousels" ref={carousel} style={{ padding: 50 }} dots={false}>
        {list}
      </Carousel>
      <div className="controller">
        <p style={{ fontSize: 24, padding: "5px 10px", background: "violet" }}>Узнать побольше</p>
        <div>
          <button onClick={handlePrev}>
            <LeftOutlined />
          </button>
          <button onClick={handleNext}>
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
const Home = () => {
  let language = localStorage.getItem("language") || "KZ";
  const [text, setText] = useState(lang[language]);
  console.log(text);
  let handleLanguage = (l) => {
    setText(lang[l]);
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 30 }}>
      <Header />
      <div className="container">
        <Slider array={text.slider} />
      </div>
      <Footer language={handleLanguage} />
    </div>
  );
};
export default Home;
