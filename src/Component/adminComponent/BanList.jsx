import axios from "axios";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
const BanList = () => {
  const [state, setState] = useState([]);
  const get = () => {
    axios.get("/api/blacklist").then((response) => {
      setState(response.data);
    });
  };
  useEffect(get, []);
  const delet = (id) => {
    axios.delete("/api/blacklist/" + id).then((response) => {
      get();
    });
  };
  const list = [...state].map((item, i) => <Card ip={item?.ip} key={i} delet={delet} id={item._id} />);
  return <div className="ban">{list}</div>;
};
const Card = ({ ip, delet, id }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        border: "1px solid",
        alignItems: "center",
      }}
    >
      <span>{ip}</span>
      <div style={{ display: "flex" }}>
        <Button type="primary" onClick={() => delet(id)}>
          Разбан
        </Button>
      </div>
    </div>
  );
};
export default BanList;
