import React from "react";
import PropTypes from "prop-types";

import Picture from "../../common/Picture";

import "./PhotoPreview.css";

const PhotoPreview = props => {
  return (
    <div className="photo-preview">
      <div className="photo-preview__image">
        <Picture src={props.photo} />
      </div>
      <div className="photo-preview__data">
        <span className="photo-preview__title">{props.title}</span>
        <button
          className="photo-preview__delete"
          type="button"
          onClick={props.onDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

PhotoPreview.propTypes = {
  title: PropTypes.string,
  photo: PropTypes.any,
  onDelete: PropTypes.func.isRequired
};

export default PhotoPreview;
