import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import SampleStore from '../stores/SampleStore'
import * as SampleActions from '../actions/SampleActions'

// import ons from 'onsenui';
import { Button } from 'react-onsenui';

let _this;
class Ranking extends React.Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props)
    this.state = {
      rankingData:[]
    }
    _this = this;
  }

  // componentWillMount() {}

  render() {
    return(
      <div>
        <Button style={{margin: '6px'}} onClick={()=>this._loadRanking()}>ランキング取得</Button>
        {this._renderRanking(this.state.rankingData)}
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
  _loadRanking() {
    console.log('_loadRanking')
    this.props.rankingActions.loadRanking()
    setTimeout(()=>{
      console.log('_renderRanking',this.props.rankingData)
      _this.setState({rankingData:this.props.rankingData.ranking})
    },2000)
  }

  _renderRanking(data) {
    console.log('_renderRanking',data)
    let _arr = [];
    data.forEach((item, index)=>{
      _arr.push(<li key={'rank_'+index}>{item.count}位：{item.username}さん：{item.score}点</li>)
    })
    return (
      <ul>
        {_arr}
      </ul>
    )
  }
  // _updateRanking() {
  //   console.log('_updateRanking')
  //   this.props.sampleActions.updateRankingData()
  // }

}

Ranking.propTypes = {
  rankingData: React.PropTypes.object,
  rankingActions: React.PropTypes.object
};



// state の中に SampleStore.js の combineReducers で指定したキーの State が全部入ってくる
function mapStateToProps(state) {
  return {
    rankingData: state.SampleReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rankingActions: bindActionCreators(SampleActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ranking);

