import React from "react";
import PropTypes from "prop-types";

import PhotoButton from "../PhotoButton";
import PhotoPreview from "../PhotoPreview";

import "./PhotoLoader.css";

const PhotoLoader = ({ name, id, buttonTitle }) => {
  const loadPhoto = e => {
    if (
      !window.File ||
      !window.FileReader ||
      !window.FileList ||
      !window.Blob
    ) {
      alert("not supported");
      return;
    }

    console.log("start");
    console.log(e.target.files);
  };

  return (
    <div>
      <PhotoButton onChange={loadPhoto} name={name} id={id}>
        {buttonTitle}
      </PhotoButton>
      <PhotoPreview title="qwert.jpg" />
    </div>
  );
};

PhotoLoader.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired
};

export default PhotoLoader;
