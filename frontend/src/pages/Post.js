import React from 'react';
import {connect} from "react-redux";
import { fetchPostDetail, removePost } from "../actions/index";
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
    const { openEditPost, body, author } = this.state;
    return (
      <div className="container">
        <div className={'open'} onClick={() => {this.deletePost(post.id)}}>delete</div>
        DETAILED POST:
        {post && (
          <PostElement key={post.id} post={post} onEdit={() => {this.setState({openEditPost: true})}} />
        )}
        {comments.length !== 0 ? 'COMMENTS:' : 'Be the first to add a comment...'}
        {comments && comments.sort((a , b) => {
          return b.timestamp - a.timestamp;
        } ).map(comment => (
          <Comment key={comment.id} comment={comment} onEdit={() => console.log("edit")} />
        ))}
        <label>Body</label>
        <input
          className="formInput"
          type={'text'}
          value={body}
          onChange={(e) => this.setState({body: e.target.value})}
        />
        <input
          className={`formInput ${false ? 'disabled' : ''}`}
          type={'text'}
          value={author}
          onChange={(e) => this.setState({author: e.target.value})}
          disabled={false}
        />
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