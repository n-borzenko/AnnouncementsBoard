import React from "react";
import PropTypes from "prop-types";

import Icon from "../Icon";
import contactTypes from "../../../constants/contactTypes";

import "./Contact.css";

const Contact = props => {
  return (
    <div className="contact">
      <div className="contact__icon">
        <Icon type={props.type} />
      </div>
      <span className="contact__text">{props.children}</span>
    </div>
  );
};

Contact.types = contactTypes;

Contact.propTypes = {
  type: PropTypes.oneOf(Object.values(Contact.types)).isRequired,
  children: PropTypes.node.isRequired
};

export default Contact;
