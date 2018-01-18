import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {removeComment, voteSelectedComment} from '../actions/index';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

class Comment extends React.Component {

  voteComment(value) {
    const { dispatch, comment } =  this.props;
    dispatch(voteSelectedComment(comment.id, value));
  }

  deleteComment() {
    const { dispatch, comment } =  this.props;
    dispatch(removeComment(comment.id));
  }

  render() {
    const { comment, onEdit } = this.props;
    return (
      <div
        className={'comment'}
        key={comment.id}
      >
        <div className={'comment-content'}>
          <div className={'postTitle'}>
            {comment.body}
          </div>
          <div className={'postTitle'}>
            {comment.author}
          </div>
          <div className={'postTitle'}>
            {moment(comment.timestamp).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        </div>
        <div className={'vote-buttons'}>
          {onEdit && (<div className={'edit'} onClick={onEdit}>edit</div>)}
          <button
            className={'icon-btn'}
            onClick={() => this.voteComment('upVote')}
          >
            <FaAngleUp size={24}/>
          </button>
          <div className={'postTitle'}>
            {comment.voteScore}
          </div>
          <button
            className={'icon-btn'}
            onClick={() => this.voteComment('downVote')}
          >
            <FaAngleDown size={24}/>
          </button>
          <div className={'delete'} onClick={() => this.deleteComment()}>delete</div>
        </div>
      </div>
    )
  }
}



Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
};

export default connect()(Comment);