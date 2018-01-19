import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteSelectedPost } from '../actions/posts';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaSearch from 'react-icons/lib/fa/search';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import FaQuoteLeft from 'react-icons/lib/fa/quote-left';
import FaQuoteRight from 'react-icons/lib/fa/quote-right';

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
          <div>
            category: {post.category}
          </div>
          <div>
            title: {post.title}
          </div>
          <div>
            <FaQuoteLeft/> {post.body} <FaQuoteRight/>
          </div>
          <div>
            <FaUser /> {post.author}
          </div>
          <div>
            {moment(post.timestamp).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div>
            <FaCommentO size={16}/> {post.commentCount}
          </div>
        </div>
        <div className={'vote-buttons'}>
          {onEdit && (
            <button
              className={'icon-btn'}
              onClick={onEdit}
            >
              edit <FaEdit />
            </button>)}
          {onDelete && !onEdit && (
            <button
              className={'icon-btn'}
              onClick={onDelete}
            >
              <FaTrashO size={18}/>
            </button>)}
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
          {onDetail && (
            <button
              className={'icon-btn'}
              onClick={onDetail}
            >
              details <FaSearch size={12} />
            </button>)}
          {onDelete && !onDetail && (
            <button
              className={'icon-btn'}
              onClick={onDelete}
            >
              <FaTrashO size={18}/>
            </button>)}
        </div>
      </div>
    )
  }
}

PostElement.propTypes = {
  post: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDetail: PropTypes.func,
  onDelete: PropTypes.func,
  dispatch: PropTypes.func,
};

export default connect()(PostElement);