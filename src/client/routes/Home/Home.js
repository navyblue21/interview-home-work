import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import Layout from "../../components/Layout";
import Post from "../../components/Post";

import s from "./Home.module.scss";

class Home extends Component {
  render() {
    const { postList, userList } = this.props;

    return (
      <Layout>
        <Row>
          <Col md={2} />
          <Col xs={12} md={8}>
            {postList.map(({ id, owner, title, content, tags }, index) => {
              const matchedOwner = userList.find(user => user.id === owner);
              const ownerName = (matchedOwner && matchedOwner.name) || "";

              return (
                <Fragment key={id}>
                  {index !== 0 && <hr />}
                  <Post
                    className={s.post}
                    post={{ owner: ownerName || owner, title, content, tags }}
                  />
                </Fragment>
              );
            })}
          </Col>
          <Col md={2} />
        </Row>
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
