import * as ActionType from '../constants/ActionType';

const initialState = {
  ranking:[]
};


export default function SampleReducer(state = initialState, action) {
  let resData;
  let rankingData;
  switch (action.type) {
  case ActionType.LOAD_DATA_REQUEST: {  //Fetch Data リクエスト
    console.log(ActionType.REQUEST)
    break;
    // return Object.assign({}, state, {
    //   items: state.items
    // });
  }
  case ActionType.LOAD_DATA_RESULT: {   //Fetch Data リザルト
    if(action.result) {
      resData = action.result;
    }else{
      resData = []
    }
    return Object.assign({}, state, {
      items: resData
    });
  }
  
  case ActionType.SAVE_SCORE_REQUEST: {
    console.log(ActionType.SAVE_SCORE_REQUEST)
    return Object.assign({}, state, {});
  }

  case ActionType.SAVE_SCORE_RESULT: {
    console.log(ActionType.SAVE_SCORE_RESULT)
    return Object.assign({}, state, {});
  }


  case ActionType.LOAD_RANKING_REQUEST: {
    console.log(ActionType.LOAD_RANKING_REQUEST)
    return Object.assign({}, state, {});
  }

  case ActionType.LOAD_RANKING_RESULT: {
    console.log(ActionType.LOAD_RANKING_RESULT)
    if(action.result) {
      rankingData = action.result;
    }else{
      rankingData = [];
    }
    return Object.assign({}, state.ranking, {
      ranking: rankingData
    });
  }

  default:
    return state;
  }
}
