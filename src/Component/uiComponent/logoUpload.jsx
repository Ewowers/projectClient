import React, { useState, useRef } from "react";
const Upload = ({ setState, styles }) => {
  const input = useRef(null);
  const [image, setImage] = useState(false);
  const handleChange = (e) => {
    const rider = new FileReader();
    rider.onload = (evn) => {
      setImage(evn.target.result);
      setState(evn.target.result);
    };
    rider.readAsDataURL(e.target.files[0]);
  };
  return (
    <div onClick={() => input.current.click()}>
      {!image ? <button style={styles}>logo</button> : null}
      <input type="file" ref={input} style={{ display: "none" }} onChange={handleChange} />
      {image ? <img src={image} alt="logo" style={styles} /> : null}
    </div>
  );
};

export default Upload;
