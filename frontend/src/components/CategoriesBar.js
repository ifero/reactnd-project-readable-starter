import React from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from "../actions/index";
import {Link} from "react-router-dom";

class CategoriesBar extends React.Component {

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategories());
  }

  render (){
    const { categories } = this.props;
    return (
      <div>
      {categories && categories.map(category => (
        <ul className="category" key={category.path}><Link to={`/${category.path}`} >{category.name}</Link></ul>
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