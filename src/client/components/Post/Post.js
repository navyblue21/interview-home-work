import React from "react";
import PropTypes from "prop-types";
import ReactTextCollapse from "react-text-collapse";

import s from "./Post.module.scss";

const options = {
  collapse: false,
  collapseText: "... show more",
  expandText: "show less",
  minHeight: 100,
  maxHeight: 250,
};

function Post({ post, isExpand }) {
  const { owner, title, content, tags } = post;
  const Content = isExpand ? (
    <ReactTextCollapse options={options}>
      <p>{content}</p>
    </ReactTextCollapse>
  ) : (
    <p>{content}</p>
  );

  return (
    <div className={s.post}>
      <h5>{`Name: ${owner}`}</h5>
      <h3>{title}</h3>
      <h6>
        {tags.map(tag => (
          <span key={tag}>{`#${tag}`}</span>
        ))}
      </h6>
      {Content}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  ).isRequired,
  isExpand: PropTypes.bool,
};

Post.defaultProps = {
  isExpand: false,
};

export default Post;
