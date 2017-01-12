import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
            <div>
              { /* ★各コンポーネントへのリンクはLinkで記述 */ }
              <ul>
                <li><Link to="page1">Page1</Link></li>
                <li><Link to="page2/id1/id2">Page2</Link></li>
                <li><Link to="page3">Page3</Link></li>
              </ul>

               { /* ★Page1、Page2、Page3コンポーネントの内容はココに展開される */ }
              {this.props.children}
            </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};