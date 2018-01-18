import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {removeComment, voteSelectedComment} from '../actions/index';

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
          {moment(comment.timestamp).format("DD/MM/YYYY HH:mm:ss")}
        </div>
        <div className={'postTitle'}>
          {comment.voteScore}
        </div>
        {onEdit && (<div className={'edit'} onClick={onEdit}>edit</div>)}
        <div className={'edit'} onClick={() => this.voteComment('upVote')}>UP</div>
        <div className={'edit'} onClick={() => this.voteComment('downVote')}>DOWN</div>
        <div className={'delete'} onClick={() => this.deleteComment()}>delete</div>
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