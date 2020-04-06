import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "reactstrap";

import s from "./Button.module.scss";

const CustomButton = props => {
  const {
    className,
    children,
    text,
    value,
    onClick,
    customStyle,
    id,
    type,
  } = props;

  return (
    <Button
      id={id}
      className={classnames(s.button, className)}
      type={type}
      onClick={onClick}
      value={value}
      color={customStyle}
    >
      {children || text}
    </Button>
  );
};

CustomButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string,
};

CustomButton.defaultProps = {
  id: "",
  children: null,
  text: "",
  className: "",
  onClick: () => {},
  value: "",
  customStyle: "primary",
  type: "button",
};

export default CustomButton;
