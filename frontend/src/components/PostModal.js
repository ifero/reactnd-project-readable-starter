import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { editSelectedPost, createPost} from '../actions/posts';

const overlay = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class PostModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
      category: 'react',
      showErrorMessage: false,
    }
  }


  checkData() {
    const { title, author, body, category } = this.state;
    const { onClose, addPost, editPost, isEditingPost, post } = this.props;
    if (title.length === 0 || author.length === 0
      || body.length === 0 || category.length === 0) {
      this.setState({showErrorMessage: true});
    }
    else {
      this.setState({showErrorMessage: false});
      if (isEditingPost) {
        editPost(post.id, title, body)
          .then(() => onClose())
          .catch(() => console.log("error"));
      }
      else {
        addPost({title, body, author, category})
          .then(() => onClose())
          .catch(() => console.log("error"));
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post) {
      this.setState({
        title: newProps.post.title || '',
        author: newProps.post.author || '',
        body: newProps.post.body || '',
        category: newProps.post.category || 'react',
      })
    }
  }

  render(){
    const { title, author, body, showErrorMessage } = this.state;
    const { isOpen, onClose, categories, isEditingPost } = this.props;
    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel='Modal'
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={overlay}
      >
        <div className='formContainer'>
          <label>Title</label>
          <input
            className="formInput"
            type={'text'}
            value={title}
            onChange={(e) => this.setState({title: e.target.value})}
          />
          <label>Body</label>
          <input
            className="formInput"
            type={'text'}
            value={body}
            onChange={(e) => this.setState({body: e.target.value})}
          />
          <label>Category</label>
          <select
            className="inputCategory"
            default={'react'}
            onChange={(e) => this.setState({category: e.target.value})}
            disabled={isEditingPost}
          >
            <option value={''} label={'select category'} disabled/>
            {categories && categories.map(category => (
              <option key={category.path} value={category.name} label={category.name} />
            ))}
          </select>
          <label>Author</label>
          <input
            className={`formInput ${isEditingPost ? 'disabled' : ''}`}
            type={'text'}
            value={author}
            onChange={(e) => this.setState({author: e.target.value})}
            disabled={isEditingPost}
          />
          <button onClick={() => this.checkData()}>send</button>
          <div onClick={onClose}>close</div>
        </div>
        <div className={`errorMessage ${showErrorMessage ? '' : 'hide'}`}>
          <label>Some params are missing</label>
        </div>
      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(createPost(post)),
    editPost: (post_id, title, body) => dispatch(editSelectedPost(post_id, title, body)),
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoriesReducer.categories,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)