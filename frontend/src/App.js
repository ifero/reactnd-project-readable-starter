import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from './actions'
import './styles.css';

class ReadableApp extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchPosts());
  }

  render() {
    const { categories, posts } = this.props;
    console.log(posts);
    return (
      <div className="container">
        {categories && categories.map(category => (
          <ul className="category" key={category.path}>{category.name}</ul>
        ))}
        {posts && posts.map(post => (
          <div
            className={'post'}
            key={post.id}
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
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoriesReducer.categories,
    posts: state.postsReducer.posts,
  };
}

export default connect(mapStateToProps)(ReadableApp);
