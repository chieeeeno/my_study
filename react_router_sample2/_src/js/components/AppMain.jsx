import React from 'react';
import { Link } from 'react-router';

// import ons from 'onsenui';
import { Button, Page, Toolbar } from 'react-onsenui';

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
        renderToolbar={this.renderToolbar}
        >
        <section>
          
          <ul>
            <li><Link to="page1/easy">初級</Link></li>
            <li><Link to="page1/normal">中級</Link></li>
            <li><Link to="page1/hard">上級</Link></li>
            <li><Link to="page2/aaa/bbb">Page2</Link></li>
            <li><Link to="page3/easy">Page3</Link></li>
            <li><Link to="hoge">Page3</Link></li>
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
  renderToolbar() {
    return (
      <Toolbar className="toolbar">
        <div className="center">タブの編集</div>
        <div className="right btn-block btn-block--right">
          <Button className="button--normal" onClick={this.popTabConfig}>完了</Button>
        </div>
      </Toolbar>
    )
  }
}

AppMain.propTypes = {
  children: React.PropTypes.object
};