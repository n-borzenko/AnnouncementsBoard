import React, { useState } from "react";
import PropTypes from "prop-types";

import PhotoButton from "../PhotoButton";
import PhotoPreview from "../PhotoPreview";

import "./PhotoLoader.css";

const defaultName = "Unknown";

const renderButton = (props, loadPhoto) => {
  return (
    <>
      <PhotoButton
        onChange={loadPhoto}
        name={props.name}
        id={props.id}
        focus={props.focus}
      >
        {props.buttonTitle}
      </PhotoButton>
      <img
        style={{
          width: "auto",
          height: "auto",
          opacity: 0,
          position: "absolute"
        }}
      />
    </>
  );
};

const renderPreview = (photo, name, removePhoto) => {
  return <PhotoPreview title={name} photo={photo} onDelete={removePhoto} />;
};

const PhotoLoader = props => {
  const [photoName, setPhotoName] = useState(defaultName);

  const removePhoto = () => {
    props.onChange(null);
    setPhotoName(defaultName);
  };

  const loadPhoto = e => {
    if (
      !window.File ||
      !window.FileReader ||
      !window.FileList ||
      !window.Blob
    ) {
      return;
    }
    const files = e.target.files;
    if (!files || !files.length) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      props.onChange(e.target.result);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {props.photo
        ? renderPreview(props.photo, photoName, removePhoto)
        : renderButton(props, loadPhoto)}
    </div>
  );
};

PhotoLoader.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  photo: PropTypes.any,
  buttonTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};

PhotoLoader.defaultProps = {
  focus: false
};

export default PhotoLoader;
