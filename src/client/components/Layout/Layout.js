import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "reactstrap";
import classnames from "classnames";

import Header from "./Header";
import Button from "../Button";

import s from "./styles/Layout.module.scss";

export default function Layout({ children }) {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const headerBottomPositon = 96;

  const checkScrollDown = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > headerBottomPositon) {
      setIsScrollDown(true);
    } else {
      setIsScrollDown(false);
    }

    // lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollDown, false);

    return () => {
      window.removeEventListener("scroll", checkScrollDown);
    };
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
        <Button
          className={classnames(s.scrollToTop, { [s.enable]: isScrollDown })}
        />
      </Container>
    </>
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
