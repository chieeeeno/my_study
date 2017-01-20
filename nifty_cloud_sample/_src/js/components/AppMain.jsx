import React from 'react';
import { Link } from 'react-router';

// import ons from 'onsenui';
import { Page, Toolbar } from 'react-onsenui';

let _this;
export default class AppMain extends React.Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props);
    _this = this;
    _this.state = {}
  }

  componentWillMount() {}

  render() {
    return (
      <Page
        renderToolbar={this._renderToolbar}
        >
        <section>
          
          <ul>
            <li><Link to="game">ゲーム</Link></li>
            <li><Link to="ranking">ランキング</Link></li>
          </ul>
          {_this.props.children}
        </section>

      </Page>
      
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



  // methods =========================
  _renderToolbar() {
    return (
      <Toolbar className="toolbar">
        <div className="center">トップページ</div>
      </Toolbar>
    )
  }
}

AppMain.propTypes = {
  children: React.PropTypes.object
};