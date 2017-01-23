import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import SampleStore from '../stores/SampleStore'
import * as SampleActions from '../actions/SampleActions'

// import ons from 'onsenui';
import { Button } from 'react-onsenui';

let self;
class Ranking extends React.Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props)
    this.state = {
      rankingData:[]
    }
    self = this;
  }

  // componentWillMount() {}

  render() {
    return(
      <div>
        <Button style={{margin: '6px'}} onClick={()=>self._loadRanking()}>ランキング取得</Button>
        {self._renderRanking(self.state.rankingData)}
      </div>
    )
  }

  componentDidMount() {
    self._loadRanking();
  }



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
    self.props.rankingActions.loadRanking()
    setTimeout(()=>{
      console.log('_renderRanking',self.props.rankingData)
      self.setState({rankingData:self.props.rankingData.ranking})
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

