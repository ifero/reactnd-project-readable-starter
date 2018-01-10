import React from 'react';
import { getCategories } from './utilities/APIAccessor';
import { Route } from 'react-router-dom';

class ReadableApp extends React.Component {
  state = {
    books: []
  }
  
  componentWillMount() {
    getCategories().then(data => console.log(data));
  }

  render() {

    return (
      <div className="app">
      <Route exact path="/" render={() => 
        <div style={{flex: 1, backgroundColor: 'green'}}/>
      }/>
      <Route path="/search" render={() =>
        <div style={{flex: 1, backgroundColor: 'red'}}/>
        }/>
      </div>
    )
  }
}

export default ReadableApp
