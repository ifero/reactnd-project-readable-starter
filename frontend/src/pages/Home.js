import React from 'react';
import {connect} from "react-redux";
import { fetchPosts } from "../actions/index";
import CategoriesBar from "../components/CategoriesBar";
import {Link} from "react-router-dom";

class Home extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  render (){
    const { posts, selectedCategory } = this.props;
    return (
      <div>
      <CategoriesBar ></CategoriesBar>
        { posts && posts.filter(post => {
          if (selectedCategory) {
            return post.category === selectedCategory
          }
          return true;
        }).map(post => (
          <Link
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
          </Link>
        ))
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categoriesReducer.categories,
    posts: state.postsReducer.posts,
    selectedCategory: ownProps.match.params.category,
  };
}

export default connect(mapStateToProps)(Home);