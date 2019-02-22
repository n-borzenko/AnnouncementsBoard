import React from "react";
import PropTypes from "prop-types";

import Title from "../common/Title";
import Text from "../common/Text";
import Contact from "../common/Contact";
import Button from "../common/Button";

import "./Announcement.css";

const renderLocation = location => {
  if (!location || !location.length) {
    return null;
  }
  return (
    <div className="announcement__location">
      <Contact type={Contact.types.location}>{location}</Contact>
    </div>
  );
};

const renderText = text => {
  if (!text || !text.length) {
    return null;
  }
  return (
    <div className="announcement__text">
      <Text>{text}</Text>
    </div>
  );
};

const renderLeftSide = props => {
  return (
    <div className="announcement__left-side">
      <div className="announcement__title">
        <Title>{props.title}</Title>
      </div>
      {renderText(props.text)}
      <div className="annoumcement__image">
        <img />
      </div>
    </div>
  );
};

const renderRightSide = (props, handleDelete, handleEdit) => {
  return (
    <div className="announcement__right-side">
      <div className="announcement__contacts">
        <div className="announcement__phone">
          <Contact type={Contact.types.phone}>{props.phone}</Contact>
        </div>
        {renderLocation(props.city)}
      </div>
      <div className="announcement__actions">
        <div className="announcement__edit">
          <Button onClick={handleEdit}>Редактировать</Button>
        </div>
        <div className="announcement__delete">
          <Button onClick={handleDelete} type={Button.types.destructive}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

const Announcement = props => {
  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const handleEdit = () => {
    props.onEdit(props.id);
  };

  return (
    <div className="announcement">
      {renderLeftSide(props)}
      {renderRightSide(props, handleDelete, handleEdit)}
    </div>
  );
};

Announcement.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  phone: PropTypes.string.isRequired,
  city: PropTypes.string,
  image: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Announcement;
