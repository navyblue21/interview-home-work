import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import ExpandText from "../ExpandText";

import s from "./Post.module.scss";

function Post({ post, className }) {
  const { owner, title, content, tags } = post;

  return (
    <div className={classnames("globalShadow", s.post, className)}>
      <h3>
        <strong>{title}</strong>
      </h3>
      <h5>{`Author: ${owner}`}</h5>
      <h6>
        {tags.map(tag => (
          <span key={tag}>{`#${tag} `}</span>
        ))}
      </h6>
      <ExpandText>{content}</ExpandText>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    owner: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  className: PropTypes.string,
};

Post.defaultProps = {
  className: "",
};

export default Post;
