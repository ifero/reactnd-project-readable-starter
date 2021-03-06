import React from 'react';
import {connect} from "react-redux";
import {fetchPosts, removePost} from "../actions/posts";
import { push } from "react-router-redux";
import PostModal from "../components/PostModal";
import PostElement from "../components/PostElement";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openCreatePost: false,
      sortByDate: true,
    }
  }

  componentWillMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  render (){
    const { posts, selectedCategory, pushPath, delPost } = this.props;
    const { openCreatePost, sortByDate } = this.state;
    return (
      <div>
        All Posts ordered by
        <select default={'timestamp'} onChange={e => this.setState({sortByDate: e.target.value === 'timestamp'})}>
          <option value={'timestamp'} label={'time'} />
          <option value={'voteScore'} label={'vote'} />
        </select>
        { posts && posts.filter(post => {
          if (selectedCategory) {
            return post.category === selectedCategory
          }
          return true;
        }).sort((a , b) => {
          return sortByDate ? b.timestamp - a.timestamp : b.voteScore - a.voteScore;
        } ).map(post => (
          <PostElement
            key={post.id}
            post={post}
            onDetail={() => {pushPath(`/${post.category}/${post.id}`)}}
            onDelete={() => {delPost(post.id)}}
          />
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

function mapDispatchToProps(dispatch) {
  return {
    pushPath: path => dispatch(push(path)),
    getPosts: () => dispatch(fetchPosts()),
    delPost: post_id => dispatch(removePost(post_id)),
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categoriesReducer.categories,
    posts: state.postsReducer.posts,
    selectedCategory: ownProps.match.params.category,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);