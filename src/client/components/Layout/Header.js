import React from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userActions } from "../../data/actions";
import Button from "../Button";

import s from "./styles/Header.module.scss";

function Header({ logout }) {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <Row>
      <Col>
        <div className={s.container}>
          <div>LOGO</div>
          <div>
            <h1>BLOGS</h1>
          </div>
          <div>
            <Button onClick={handleLogout} text="Log Out" />
          </div>
        </div>
      </Col>
    </Row>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

const { logout } = userActions;
const mapDispatchToProps = {
  logout,
};

const connectedHeader = connect(
  null,
  mapDispatchToProps
)(Header);

export default connectedHeader;
