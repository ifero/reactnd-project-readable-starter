import React from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from "../actions/index";
import {Link} from "react-router-dom";
import FaHome from 'react-icons/lib/fa/home';

class CategoriesBar extends React.Component {

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategories());
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

function mapStateToProps(state) {
  return {
    categories: state.categoriesReducer.categories,
  };
}

export default connect(mapStateToProps)(CategoriesBar)