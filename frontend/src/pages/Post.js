import React from 'react';
import {connect} from "react-redux";
import { fetchPostDetail, removePost, createComment, editSelectedComment } from "../actions/index";
import { push } from 'react-router-redux';
import PostModal from '../components/PostModal';
import PostElement from '../components/PostElement';
import Comment from '../components/Comment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditPost: false,
      body: '',
      author: '',
      editComment: false,
      showErrorMessage: false,
      comment_id: '',
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

  clearInputs() {
    this.setState({body: '', author: '', editComment: false, comment_id: ''});
  }

  saveComment() {
    const { editComment, body, author, comment_id } = this.state;
    const { dispatch, post } = this.props;
    if (author.length === 0 || body.length === 0) {
      this.setState({showErrorMessage: true});
    }
    else {
      this.setState({showErrorMessage: false});
      if (editComment) {
        dispatch(editSelectedComment(comment_id, body))
          .then(() => this.clearInputs())
          .catch(() => console.log("error"));
      }
      else {
        dispatch(createComment(post.id, {body, author}))
          .then(() => this.clearInputs())
          .catch(() => console.log("error"));
      }
    }
  }

  editCommentMode(comment) {
    this.setState({body: comment.body, author: comment.author, editComment: true, comment_id: comment.id});
  }

  render (){
    const { post, comments } = this.props;
    const { openEditPost, body, author, editComment, showErrorMessage } = this.state;
    return (
      <div className="container">
        {post && (
          <PostElement
            key={post.id}
            post={post}
            onEdit={() => {this.setState({openEditPost: true})}}
            onDelete={() => {this.deletePost(post.id)}}
          />
        )}
        {comments.length !== 0 ? 'COMMENTS:' : 'Be the first to add a comment...'}
        {comments && comments.sort((a , b) => {
          return a.timestamp - b.timestamp;
        } ).map(comment => (
          <Comment key={comment.id} comment={comment} onEdit={() => this.editCommentMode(comment)} />
        ))}
        <div className={'newComment'}>
          <label>comment:</label>
          <textarea
            placeholder={'Type in your comment'}
            className="formInput"
            type={'text'}
            value={body}
            onChange={(e) => this.setState({body: e.target.value})}
          />
          <label>author:</label>
          <input
            placeholder={'Type in your nickname'}
            className={`formInput ${editComment ? 'disabled' : ''}`}
            type={'text'}
            value={author}
            onChange={(e) => this.setState({author: e.target.value})}
            disabled={editComment}
          />
          <input
            className="submitInput"
            type={'submit'}
            onClick={() => this.saveComment()}
          />
          <div className={`errorMessage ${showErrorMessage ? '' : 'hide'}`}>
            <label>Some params are missing</label>
          </div>
        </div>
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