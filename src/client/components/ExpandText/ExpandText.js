/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import s from "./ExpandText.module.scss";

function ExpandText({ children }) {
  const paragraphRef = useRef(<p />);
  const [isExpanded, setExpanded] = useState(() => {
    const element = paragraphRef.current;
    const { offsetHeight } = element;
    const { lineHeight } = parseInt(element.style, 10);
    const lineCount = offsetHeight / lineHeight;

    return lineCount < 6;
  });

  const toggleExpand = () => {
    setExpanded(prevState => {
      return !prevState;
    });
  };

  return (
    <p
      className={classnames(s.paragraph, { [s.expanded]: isExpanded })}
      tabIndex="-1"
      onKeyDown={() => {}}
      onClick={toggleExpand}
      ref={paragraphRef}
    >
      {children}
      {isExpanded === false && "See more..."}
    </p>
  );
}

ExpandText.propTypes = {
  children: PropTypes.node,
};

ExpandText.defaultProps = {
  children: undefined,
};

export default ExpandText;
