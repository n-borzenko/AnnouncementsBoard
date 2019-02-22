import React from "react";

import "./Picture.css";

import image from "./resources/picture.png";

const Picture = () => {
  return <img className="picture" src={image} />;
};

export default Picture;
