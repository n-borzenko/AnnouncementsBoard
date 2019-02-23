import React from "react";

import "./Picture.css";

import image from "./resources/picture.png";

const Picture = props => {
  return <img className="picture" src={props.src || image} />;
};

export default Picture;
