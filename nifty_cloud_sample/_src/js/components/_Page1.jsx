import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SampleStore from '../stores/SampleStore'
import * as SampleActions from '../actions/SampleActions'

// import ons from 'onsenui';
import { Button } from 'react-onsenui';

class Page1 extends React.Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props)
    this.state = {
      level:this.props.params.level
    }
    console.log(this.props.params.level)
    console.log(this.state.level)
  }

  // componentWillMount() {}

  render() {
    return(
      <div>
        <Button style={{margin: '6px'}} onClick={()=>this._saveRanking()}>ランキング保存</Button>
        <Button style={{margin: '6px'}} onClick={()=>this._updateRanking()}>ランキング更新</Button>
        
      </div>
    )
  }

  // componentDidMount() {}



  // Updating =========================
  // componentWillReceiveProps() {}

  // shouldComponentUpdate() {}

  // componentWillUpdate() {}
  // componentDidUpdate() {}


  // Unmounting =========================
  // componentWillUnmount() {}



  // methods =========================
  _saveRanking() {
    console.log('_saveRanking')
    this.props.sampleActions.saveRankingData()
  }
  _updateRanking() {
    console.log('_updateRanking')
    this.props.sampleActions.updateRankingData()
  }

}

Page1.propTypes = {
  params: React.PropTypes.object,
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
)(Page1);

