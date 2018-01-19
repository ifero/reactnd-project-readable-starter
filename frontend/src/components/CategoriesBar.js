import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CategoriesActions from "../actions/categories";
import {Link} from "react-router-dom";
import FaHome from 'react-icons/lib/fa/home';

class CategoriesBar extends React.Component {

  componentWillMount() {
    const {fetchCategories} = this.props;
    fetchCategories();
  }

  render (){
    const { categories } = this.props;
    return (
      <div >
        <Link to={'/'} ><FaHome size={24}/></Link>
      {categories && categories.map(category => (
        <Link className={'category'} key={category.path} to={`/${category.path}`} >{category.name}</Link>
      ))}
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CategoriesActions, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categoriesReducer.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar)