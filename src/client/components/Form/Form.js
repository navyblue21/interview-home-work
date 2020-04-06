/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";

function CustomForm({ children, className, ...restProps }) {
  return (
    <Formik {...restProps}>
      <Form className={className}>{children}</Form>
    </Formik>
  );
}

CustomForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
};

CustomForm.defaultProps = {
  children: undefined,
  className: undefined,
};

export default CustomForm;
