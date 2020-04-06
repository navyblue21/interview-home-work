import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Layout from "../../components/Layout";
import Post from "../../components/Post";

class Home extends Component {
  render() {
    const { postList, userList } = this.props;

    return (
      <Layout>
        <div>
          {postList.map(({ id, owner, title, content, tags }) => {
            const matchedOwner = userList.find(user => user.id === owner);
            const ownerName = (matchedOwner && matchedOwner.name) || "";

            return (
              <Post
                key={id}
                post={{ owner: ownerName || owner, title, content, tags }}
                isExpand
              />
            );
          })}
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  postList: PropTypes.arrayOf(PropTypes.object),
  userList: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  postList: [],
  userList: [],
};

const mapStateToProps = state => {
  const { post, user } = state;
  const postList = post.posts;
  const userList = user.users;

  return { postList, userList };
};

const connectedHome = connect(mapStateToProps)(Home);

export default connectedHome;
