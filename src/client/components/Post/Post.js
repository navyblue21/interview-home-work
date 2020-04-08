import React from "react";
import PropTypes from "prop-types";

import s from "./Post.module.scss";
import ExpandText from "../ExpandText";

function Post({ post }) {
  const { owner, title, content, tags } = post;

  return (
    <div className={s.post}>
      <h5>{`Name: ${owner}`}</h5>
      <h3>{title}</h3>
      <h6>
        {tags.map(tag => (
          <span key={tag}>{`#${tag}`}</span>
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
  isExpand: PropTypes.bool,
};

Post.defaultProps = {
  isExpand: false,
};

export default Post;
