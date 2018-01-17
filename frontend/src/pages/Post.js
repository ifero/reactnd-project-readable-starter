import React from 'react';
import {connect} from "react-redux";
import { fetchPostDetail, removePost } from "../actions/index";
import { push } from 'react-router-redux';
import moment from 'moment';

class Post extends React.Component {


  componentWillMount() {
    const { id, dispatch } = this.props;
    dispatch(fetchPostDetail(id));
  }

  deletePost(post_id) {
    const { dispatch } = this.props;
    dispatch(removePost(post_id))
      .then(() => {
        dispatch(push('/'));
      })
  }

  render (){
    const { post, comments } = this.props;
    console.log(post);
    console.log(comments);
    return (
      <div className="container">
        DETAILED POST:
        {post && (
          <div
            className={'post'}
            key={post.id}
          >
            <div className={'postTitle'}>
              {post.title}
            </div>
            <div className={'postTitle'}>
              {post.body}
            </div>
            <div className={'postTitle'}>
              {post.author}
            </div>
            <div className={'postTitle'}>
              {post.category}
            </div>
            <div className={'postTitle'}>
              {post.voteScore}
            </div>
            <div className={'postTitle'}>
              {moment.unix(post.timestamp).format("DD/MM/YYYY HH:mm:ss")}
            </div>
          </div>
        )}
        {comments && comments.map(comment => (
          <div
            className={'post'}
            key={comment.id}
          >
            <div className={'postTitle'}>
              {comment.body}
            </div>
            <div className={'postTitle'}>
              {comment.author}
            </div>
            <div className={'postTitle'}>
              {comment.voteScore}
            </div>
          </div>
        ))}
        <div className={'open'} onClick={() => {this.deletePost(post.id)}}>delete</div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.postsReducer.post,
    comments: state.postsReducer.comments,
    id: ownProps.match.params.post_id,
  };
}

export default connect(mapStateToProps)(Post);