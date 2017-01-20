import React , {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import SampleStore from '../stores/SampleStore'
import * as SampleActions from '../actions/SampleActions'

// import ons from 'onsenui';
import { Button, Dialog, Input } from 'react-onsenui';


class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogShown:false,
      level: '',
      username: '',
      score:''
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return(
      <div>
        Game<br />
        <Button style={{margin: '6px'}} onClick={()=>this._showModal()}>ランキング保存</Button>

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
                <p>
                  <Input
                    className='modalInput'
                    value={this.state.score}
                    onChange={(e)=>this._handleScoreChange(e)}
                    modifier='material'
                    float
                    placeholder='Score' />
                </p>
                <select value={this.state.level} onChange={(e)=>this._handleUserLevelChange(e)} ref="level">
                  <option value="easy">初級</option>
                  <option value="normal">中級</option>
                  <option value="hard">上級</option>
                </select>
                
              </section>
              <Button className="button--small" modifier='cta large' onClick={()=>this._saveRanking()}>登録する</Button>
              <Button className="button--small" modifier='outline large' onClick={()=>this._hideModal()}>閉じる</Button>
            </div>
        </Dialog>
      </div>
    )
  }

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
   * ランキングを保存する
   */
  _saveRanking() {
    console.log('_saveRanking')
    this.props.sampleActions.saveScore({
      level:this.state.level,
      username:this.state.username,
      score:this.state.score
    },()=>this._hideModal())
  }


  // _updateRanking() {
  //   console.log('_updateRanking')
  //   this.props.sampleActions.updateRankingData()
  // }

  _handleUsernameChange(e) {
    console.log('_handleUsernameChange',e.target.value)
    this.setState({username: e.target.value});
  }

  _handleScoreChange(e) {
    console.log('_handleScoreChange',e.target.value)
    this.setState({score: e.target.value});
  }

  _handleUserLevelChange(e) {
    console.log('_handleUserLevelChange',e.target.value)
    this.setState({level: e.target.value});
  }

}

Game.propTypes = {
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
)(Game);
