import React from 'react';
import {connect} from "react-redux";
import { fetchPostDetail, removePost } from '../actions/posts';
import { createComment, editSelectedComment } from "../actions/comments";
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
      show404: false,
    }
  }

  componentWillMount() {
    const { id, fetchPost } = this.props;
    fetchPost(id)
      .catch(() => {
        this.setState({show404: true});
    });
  }

  deletePost(post_id) {
    const { delPost, pushPath } = this.props;
    delPost(post_id)
      .then(() => {
        pushPath('/');
      })
  }

  clearInputs() {
    this.setState({body: '', author: '', editComment: false, comment_id: ''});
  }

  saveComment() {
    const { editComment, body, author, comment_id } = this.state;
    const { post, editTheComment, addComment } = this.props;
    if (author.length === 0 || body.length === 0) {
      this.setState({showErrorMessage: true});
    }
    else {
      this.setState({showErrorMessage: false});
      if (editComment) {
        editTheComment(comment_id, body)
          .then(() => this.clearInputs())
          .catch(() => console.log("error"));
      }
      else {
        addComment(post.id, {body, author})
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
    const { openEditPost, body, author, editComment, showErrorMessage, show404 } = this.state;
    return (
      <div className="container">
        {show404 && (<div className={"post nothingToSee "}>404</div>)}
        {!show404 && post && (
          <PostElement
            key={post.id}
            post={post}
            onEdit={() => {this.setState({openEditPost: true})}}
            onDelete={() => {this.deletePost(post.id)}}
          />
        )}
        {show404 ? null : comments.length !== 0 ? 'COMMENTS:' : 'Be the first to add a comment...'}
        {!show404 && comments && comments.sort((a , b) => {
          return a.timestamp - b.timestamp;
        } ).map(comment => (
          <Comment key={comment.id} comment={comment} onEdit={() => this.editCommentMode(comment)} />
        ))}
        {!show404 && (<div className={'newComment'}>
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
        </div>)}
        <PostModal post={post} isOpen={openEditPost} onClose={() => this.setState({openEditPost: false})} isEditingPost={true} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: post_id => dispatch(fetchPostDetail(post_id)),
    delPost: post_id => dispatch(removePost(post_id)),
    pushPath: path => dispatch(push(path)),
    editTheComment: (comment_id, body) => dispatch(editSelectedComment(comment_id, body)),
    addComment: (post_id, comment) => dispatch(createComment(post_id, comment)),
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.postsReducer.post,
    comments: state.commentsReducer.comments,
    id: ownProps.match.params.post_id,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);