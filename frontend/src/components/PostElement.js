import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteSelectedPost } from '../actions/index';

class PostElement extends React.Component {

  votePost(value) {
    const { dispatch, post } =  this.props;
    dispatch(voteSelectedPost(post.id, value));
  }

  render() {
    const {post, onEdit, onDetail } = this.props;
    return (
      <div
        className={'post'}
        key={post.id}
      >
        <div className={'postTitle'}>
          {post.category}
        </div>
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
          {moment(post.timestamp).format("DD/MM/YYYY HH:mm:ss")}
        </div>
        <div className={'postTitle'}>
          {post.voteScore}
        </div>
        <div className={'postTitle'}>
          {post.commentCount}
        </div>
        {onEdit && (<div className={'edit'} onClick={onEdit}>edit</div>)}
        {onDetail && (<div className={'open'} onClick={onDetail}>detail</div>)}
        <div className={'edit'} onClick={() => this.votePost('upVote')}>UP</div>
        <div className={'edit'} onClick={() => this.votePost('downVote')}>DOWN</div>
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