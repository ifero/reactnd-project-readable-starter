import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteSelectedPost } from '../actions/index';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

class PostElement extends React.Component {

  votePost(value) {
    const { dispatch, post } =  this.props;
    dispatch(voteSelectedPost(post.id, value));
  }

  render() {
    const {post, onEdit, onDetail, onDelete } = this.props;
    return (
      <div
        className={'post'}
        key={post.id}
      >
        <div className={'comment-content'}>
          <div className={'postTitle'}>
            category: {post.category}
          </div>
          <div className={'postTitle'}>
            title: {post.title}
          </div>
          <div className={'postTitle'}>
            content: {post.body}
          </div>
          <div className={'postTitle'}>
            author: {post.author}
          </div>
          <div className={'postTitle'}>
            {moment(post.timestamp).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div className={'postTitle'}>
            comments: {post.commentCount}
          </div>
        </div>
        <div className={'vote-buttons'}>
          {onEdit && (<div className={'edit'} onClick={onEdit}>edit</div>)}
          <button
            className={'icon-btn'}
            onClick={() => this.votePost('upVote')}
          >
            <FaAngleUp size={24}/>
          </button>
          <div className={'postTitle'}>
            {post.voteScore}
          </div>
          <button
            className={'icon-btn'}
            onClick={() => this.votePost('downVote')}
          >
            <FaAngleDown size={24}/>
          </button>
          {onDetail && (<div className={'open'} onClick={onDetail}>detail</div>)}
          {onDelete && (<div className={'open'} onClick={onDelete}>delete</div>)}
        </div>
      </div>
    )
  }
}



PostElement.propTypes = {
  post: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDetail: PropTypes.func,
  dispatch: PropTypes.func,
};

export default connect()(PostElement);