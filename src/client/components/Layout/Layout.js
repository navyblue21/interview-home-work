import React from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "reactstrap";

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Layout.defaultProps = {
  children: null,
};
