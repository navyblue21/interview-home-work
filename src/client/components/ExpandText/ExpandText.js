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
    <div
      className={classnames(s.paragraph, { [s.expanded]: isExpanded })}
      tabIndex="-1"
      onKeyDown={() => {}}
      onClick={toggleExpand}
      ref={paragraphRef}
      role="button"
    >
      <div className={s.expandColumn} />
      <p>{children}</p>
    </div>
  );
}

ExpandText.propTypes = {
  children: PropTypes.node,
};

ExpandText.defaultProps = {
  children: undefined,
};

export default ExpandText;
