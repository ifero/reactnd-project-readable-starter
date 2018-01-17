import React from 'react';
import {connect} from "react-redux";
import { fetchPosts } from "../actions/index";
import CategoriesBar from "../components/CategoriesBar";
import { push } from "react-router-redux";
import PostModal from "../components/PostModal";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openCreatePost: false,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  render (){
    const { posts, selectedCategory, dispatch } = this.props;
    const { openCreatePost } = this.state;
    return (
      <div>
      <CategoriesBar ></CategoriesBar>
        { posts && posts.filter(post => {
          if (selectedCategory) {
            return post.category === selectedCategory
          }
          return true;
        }).map(post => (
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
            <div className={'postTitle'}>
              {post.category}
            </div>
            <div className={'open'} onClick={() => {dispatch(push(`/${post.category}/${post.id}`))}}>detail</div>
          </div>
        ))
        }
        <div className={'open-modal'}>
          <div onClick={() => {this.setState({openCreatePost: true})}}>create post</div>
        </div>
        <PostModal post={{}} isOpen={openCreatePost} onClose={() => this.setState({openCreatePost: false})} isEditingPost={false} />
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