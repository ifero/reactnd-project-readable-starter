import React from 'react';
import {connect} from "react-redux";
import { fetchPosts } from "../actions/index";
import CategoriesBar from "../components/CategoriesBar";
import { push } from "react-router-redux";
import PostModal from "./PostModal";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openCreateEditPost: false,
      selectedPost: {},
      isEditingPost: false,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  render (){
    const { posts, selectedCategory, dispatch } = this.props;
    const { openCreateEditPost, selectedPost, isEditingPost } = this.state;
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
            <div className={'edit'} onClick={() => {this.setState({openCreateEditPost: true, selectedPost: post, isEditingPost: true})}}>edit</div>
            <div className={'open'} onClick={() => {dispatch(push(`/${post.category}/${post.id}`))}}>detail</div>
          </div>
        ))
        }
        <div onClick={() => {this.setState({openCreateEditPost: true, isEditingPost: false})}}>NEW</div>
        <PostModal post={selectedPost} isOpen={openCreateEditPost} onClose={() => this.setState({openCreateEditPost: false})} isEditingPost={isEditingPost} />
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