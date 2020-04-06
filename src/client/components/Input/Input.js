/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import s from "./Input.module.scss";

function Input({ type, className, name, label, ...otherProps }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ name, ...otherProps });
  const { touched, error } = meta;

  const handleChange = value => {
    setFieldValue(field.name, value);
  };

  return (
    <label htmlFor={name} className={classnames(s.input, className)}>
      {label}
      {type === "datepicker" ? (
        <DatePicker
          id={name}
          {...field}
          {...otherProps}
          /* field.value = "dd/mm/yyyy" */
          selected={(field.value && new Date(field.value).getTime()) || null}
          onChange={handleChange}
        />
      ) : (
        <input id={name} type={type} {...field} {...otherProps} />
      )}
      {touched && error && <div className={s.error}>{error}</div>}
    </label>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  className: undefined,
  label: undefined,
};

export default Input;
