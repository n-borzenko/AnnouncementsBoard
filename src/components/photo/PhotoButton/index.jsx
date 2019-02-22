import React from "react";
import PropTypes from "prop-types";

import FakeButton from "../FakeButton";
import Icon from "../../common/Icon";

import "./PhotoButton.css";

const PhotoButton = props => {
  return (
    <div className="photo-button">
      <label>
        <div className="photo-button__stub">
          <FakeButton iconType={Icon.types.clip}>{props.children}</FakeButton>
        </div>
        <input
          className="photo-button__input"
          type="file"
          onChange={props.onChange}
          accept="image/*"
          name={props.name}
          id={props.id}
        />
      </label>
    </div>
  );
};

PhotoButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default PhotoButton;
