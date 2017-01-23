import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SampleActions from '../actions/SampleActions'

// import ons from 'onsenui';
import { Button, Dialog, Input } from 'react-onsenui';

let _this;
class Register extends React.Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props);
    this.state = {
      dialogShown:false
    }
    _this = this;
  }

  // componentWillMount() {}

  render() {
    return (
      <div>
        <Button style={{margin: '6px'}} onClick={()=>this._showModal()}>ユーザー登録</Button>

        <Dialog
            isOpen={this.state.dialogShown}
            isCancelable={true}
            onCancel={this._hideModal}>
            <div className="modalCaution">
              <section style={{textAlign: 'center'}}>
                <p>
                  <Input
                    className='modalInput'
                    value={this.state.username}
                    onChange={(e)=>this._handleUsernameChange(e)}
                    modifier='material'
                    float
                    placeholder='Username' />
                </p>
              </section>
              <Button className="button--small" modifier='cta large' onClick={()=>this._userRegister()}>登録する</Button>
              <Button className="button--small" modifier='outline large' onClick={()=>this._hideModal()}>閉じる</Button>
            </div>
        </Dialog>

      </div>
    )
  }

  componentDidMount() {}



  // Updating =========================
  // componentWillReceiveProps() {}

  // shouldComponentUpdate() {}

  // componentWillUpdate() {}

  // render() {}

  // componentDidUpdate() {}


  // Unmounting =========================
  // componentWillUnmount() {}


  // methods =========================
  /**
   * モーダル画面を表示する
   */
  _showModal() {
    console.log('_showModal')
    this.setState({dialogShown: true});
  }

  /**
   * モーダル画面を非表示にする
   */
  _hideModal() {
    console.log('_hideModal')
    this.setState({dialogShown: false});
  }

  /**
   * ユーザー登録を行う
   */
  _userRegister() {
    console.log('_userRegister')
    this.props.sampleActions.registerUser(this.state.username)
  }

  _handleUsernameChange(e) {
    console.log('_handleUsernameChange',e.target.value)
    this.setState({username: e.target.value});
  }

}

Register.propTypes = {
  sampleData: React.PropTypes.object,
  sampleActions: React.PropTypes.object
};

// state の中に SampleStore.js の combineReducers で指定したキーの State が全部入ってくる
function mapStateToProps(state) {
  return {
    sampleData: state.SampleReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sampleActions: bindActionCreators(SampleActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
