import React , {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SampleStore from '../stores/SampleStore'
import * as SampleActions from '../actions/SampleActions'


class Page2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[
        'initial data!'
      ]
    }
    this._loadData = this._loadData.bind(this)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _loadData() {
    this.props.sampleActions.loadData('./data.json')
    // console.log(this.props.sampleData.items.data)
    setTimeout(()=>{
      this.setState({
        data:this.props.sampleData.items.data
      });
      // console.log(this.props.sampleData.items.data)
    },1000)
  }


  render() {
    return(
      <div>
      Page2
        <input type="button" value="load!" onClick={this._loadData} />
          {this.state.data.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))}
      </div>
    )
  }

}

Page2.propTypes = {
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
)(Page2);
