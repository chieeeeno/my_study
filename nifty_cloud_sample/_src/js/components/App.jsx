import React from 'react';
import { Link } from 'react-router';
import ons from 'onsenui';
import { Navigator } from 'react-onsenui';

import AppMain from './AppMain.jsx';

let _this;
export default class App extends React.Component {
  // methods
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;
    props.key = route.title;
    props.children = _this.props.children
    return React.createElement(route.component, props);
  }


  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props);
    _this = this;
    _this.state = {}
    //Disable material design
    ons.forcePlatformStyling('ios');
    // console.log(_this.props.children)
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <Navigator
          id="root"
          renderPage={this.renderPage}
          initialRoute={{
            component: AppMain,
            title: ''
          }}
        />
      </div>
    );
  }

  componentDidMount() {}

  // Updating =========================
  componentWillReceiveProps() {}

  // shouldComponentUpdate() {}

  componentWillUpdate() {}

  // render() {}

  componentDidUpdate() {}


  // Unmounting =========================
  componentWillUnmount() {}


}

App.propTypes = {
  children: React.PropTypes.object
};