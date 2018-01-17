import React from 'react';
import {connect} from "react-redux";
import { fetchPostDetail, removePost } from "../actions/index";
import { push } from 'react-router-redux';
import moment from 'moment';
import PostModal from '../components/PostModal';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditPost: false,
    }
  }

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
    const { openEditPost } = this.state;
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
            <div className={'edit'} onClick={() => {this.setState({openEditPost: true})}}>edit</div>
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
        <PostModal post={post} isOpen={openEditPost} onClose={() => this.setState({openEditPost: false})} isEditingPost={true} />
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