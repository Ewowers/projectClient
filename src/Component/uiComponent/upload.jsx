import React, { useState, useRef } from "react";
import { Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const Upload = (props) => {
  const [state, setState] = useState(false);
  const { avatar } = props;
  const setUrl = props.setState;
  const image = useRef(null);
  const input = useRef(null);
  const handleChange = () => {
    let file = input.current.files[0];
    if (file === undefined) return;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setState(reader.result);
      setUrl(reader.result);
    });
    reader.readAsDataURL(file);
  };
  const Btn = () => {
    if (state) return <Image style={{ width: 200, height: 200 }} src={state} ref={image} />;
    if (!avatar) {
      return (
        <Button style={{ width: 200, height: 200 }}>
          <UploadOutlined />
        </Button>
      );
    }
    return <Image style={{ width: 200, height: 200 }} src={avatar} />;
  };
  return (
    <div onClick={() => input.current.click()} style={{ display: "flex", justifyContent: "center" }}>
      <Btn />
      <input type="file" style={{ display: "none" }} ref={input} onChange={handleChange} />
    </div>
  );
};

export default Upload;
