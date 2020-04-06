import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";

import { userActions } from "../../data/actions";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Form from "../../components/Form";

import s from "./Login.module.scss";

const initialFormValues = {
  username: "",
  password: "",
  name: "",
  dob: "",
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistered: true,
    };
  }

  handleSwitch = () => {
    this.setState(prevState => ({ isRegistered: !prevState.isRegistered }));
  };

  handleSubmit = async (value: {}) => {
    const { isRegistered } = this.state;
    const { register, login } = this.props;
    const { username, password } = value;
    const isInfoLegit = username && password;

    if (isInfoLegit) {
      if (isRegistered) {
        login(username, password);
      } else {
        register(value);
      }
    }
  };

  render() {
    const { isRegistered } = this.state;
    const { alert, isLoggingIn, isRegistering } = this.props;
    const { type = "", message = "" } = alert;

    const title = isRegistered ? "SIGN IN" : "SIGN UP";
    const confirmButtonText = isRegistered ? "LOG IN" : "CREATE ACCOUNT";
    const switchButtonText = isRegistered
      ? "Don't have an account?"
      : "Already have an account?";

    return (
      <Layout>
        <div className={s.container}>
          <Form
            className={s.loginBox}
            initialValues={initialFormValues}
            onSubmit={this.handleSubmit}
          >
            <h4>
              <strong>{title}</strong>
            </h4>
            <Input name="username" className={s.input} placeholder="Username" />
            <Input
              name="password"
              className={s.input}
              placeholder="Password"
              type="password"
            />
            {!isRegistered && (
              <>
                <Input
                  name="name"
                  className={s.input}
                  placeholder="Your Name"
                />
                <Input
                  name="dob"
                  className={s.input}
                  type="datepicker"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date of Birth"
                />
              </>
            )}
            <Button className={s.button} text={confirmButtonText} type="submit">
              {(isLoggingIn || isRegistering) && <Spinner color="info" />}
            </Button>
            {type && <h5 className={`alert ${type}`}>{message}</h5>}
            <Button
              onClick={this.handleSwitch}
              text={switchButtonText}
              customStyle="link"
            />
          </Form>
        </div>
      </Layout>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired,
};

const { login, register } = userActions;
const mapStateToProps = state => {
  const { alert, authentication, registration } = state;
  const { isLoggingIn } = authentication;
  const { isRegistering } = registration;

  return { alert, isLoggingIn, isRegistering };
};
const mapDispatchToProps = {
  login,
  register,
};
const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default connectedLogin;
