import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {removeComment, voteSelectedComment} from '../actions/index';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';
import FaUser from 'react-icons/lib/fa/user';
import FaQuoteLeft from 'react-icons/lib/fa/quote-left';
import FaQuoteRight from 'react-icons/lib/fa/quote-right';

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
          <div>
            <FaQuoteLeft/> {comment.body} <FaQuoteRight/>
          </div>
          <div>
            <FaUser/>{comment.author}
          </div>
          <div>
            {moment(comment.timestamp).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        </div>
        <div className={'vote-buttons'}>
          {onEdit && (
            <button
              className={'icon-btn'}
              onClick={onEdit}
            >
              edit <FaEdit/>
            </button>)}
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
          <button
            className={'icon-btn'}
            onClick={() => this.deleteComment()}
          >
            <FaTrashO size={18}/>
          </button>
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