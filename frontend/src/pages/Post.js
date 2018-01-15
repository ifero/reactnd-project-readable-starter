import React from 'react';
import {connect} from "react-redux";
import { fetchPostDetail } from "../actions/index";
import CategoriesBar from "../components/CategoriesBar";

class Post extends React.Component {


  componentWillMount() {
    const { id, dispatch } = this.props;
    dispatch(fetchPostDetail(id));
  }

  render (){
    const { post } = this.props;
    return (
      <div className="container">
        <CategoriesBar />
        DETAILED POST:
        {post && (
          <div
            className={'post'}
            key={post.id}
            to={`/${post.category}/${post.id}`}
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
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.postsReducer.post,
    id: ownProps.match.params.post_id,
  };
}

export default connect(mapStateToProps)(Post);