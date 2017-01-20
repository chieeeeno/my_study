import { Component } from 'react';


let _this;
class Login extends Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props);
    _this = this;
    _this.state = {}
  }

  // componentWillMount() {}

  render() {
    return (
      <div>
        Sample
      </div>
    )
  }

  componentDidMount() {}



  // Updating =========================
  componentWillReceiveProps() {}

  shouldComponentUpdate() {}

  componentWillUpdate() {}

  // render() {}

  componentDidUpdate() {}


  // Unmounting =========================
  componentWillUnmount() {}

}

export default Login;
