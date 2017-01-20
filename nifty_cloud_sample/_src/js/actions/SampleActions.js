import Axios from 'axios';
// import NCMB from 'ncmb';

import NcmbUtil from '../util/NcmbUtil';
import * as ActionType from '../constants/ActionType';
import * as Constants from '../constants/Constants';


//=============================================
// To load json data
//=============================================
export function loadJsonData(url) {
  console.log(url)
  return dispatch => {
    dispatch(loadJsonDataRequest());
    Axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then((response)=>{
      console.log(response.data)
      dispatch(loadJsonDataResult(response.data))
    }).catch((error)=>{
      alert('error')
      console.error('loadData',error)
      dispatch(loadJsonDataResult(false))
    })
  };
}

function loadJsonDataRequest() {
  return {
    type: ActionType.LOAD_JSON_DATA_REQUEST
  };
}

function loadJsonDataResult(result) {
  return {
    type: ActionType.LOAD_JSON_DATA_RESULT,
    result,
  };
}



//=============================================
// To save score data to Nifty
//=============================================
export function saveScore(_data,_callback) {
  console.log('saveScore()',_data)
  return dispatch => {
    dispatch(saveScoreRequest());
    let ncmbUtil = new NcmbUtil(
      Constants.APPLICATION_KEY,
      Constants.CLIENT_KEY,
      Constants.DATA_CLASS_NAME
    );
    ncmbUtil.saveScore({
      level:_data.level,
      username:_data.username,
      score:parseInt(_data.score),
      // beforeSaveCallback:()=>{console.log('a')},
      successClallback:()=>{
        dispatch(saveScoreResult())
        _callback();
      }
      // failClallback:()=>{console.log('a')}
    });
  };
}

function saveScoreRequest() {
  return {
    type: ActionType.SAVE_SCORE_REQUEST
  };
}

function saveScoreResult() {
  return {
    type: ActionType.SAVE_SCORE_RESULT
  };
}



//=============================================
// To load the score data from Nifty
//=============================================
export function loadRanking() {
  console.log('loadRanking()')
  return dispatch => {
    dispatch(loadRankingRequest());
    let ncmbUtil = new NcmbUtil(APPLICATION_KEY,CLIENT_KEY,'ScroeClass');
    ncmbUtil.loadRanking().then((response)=>{
      console.log('ランキングの取得に成功しました。');
      console.log(response);
      dispatch(loadRankingResult(response))
    },(err)=>{
      console.log('ランキングの取得に失敗しました。エラー:' + err); 
      console.log(err)
    })
  };
}

function loadRankingRequest() {
  return {
    type: ActionType.LOAD_RANKING_REQUEST
  };
}

function loadRankingResult(result) {
  return {
    type: ActionType.LOAD_RANKING_RESULT,
    result
  };
}


//=============================================
// To register for Nifty
//=============================================

export function registerUser() {
  console.log('registerUser()')
  return dispatch => {
    dispatch(registerUserRequest());
    let ncmbUtil = new NcmbUtil(APPLICATION_KEY,CLIENT_KEY,'ScroeClass');
    // ncmbUtil.loadRanking().then((response)=>{
    //   console.log('ユーザー登録に成功しました。');
    //   console.log(response);
    //   dispatch(lregisterUserResult(response))
    // },(err)=>{
    //   console.log('ユーザー登録に失敗しました。エラー:' + err); 
    //   console.log(err)
    // })
  };
}

function registerUserRequest() {
  return {
    type: ActionType.LOAD_RANKING_REQUEST
  };
}

function lregisterUserResult(result) {
  return {
    type: ActionType.LOAD_RANKING_RESULT,
    result
  };
}



// export function updateRankingData() {
//   console.log('updateRankingData()')
//   return dispatch => {
//     dispatch(updateRankingDataRequest());
    
//     let ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);

//     // クラスのTestClassを作成
//     let ScoreClass = ncmb.DataStore('ScroeClass');
//     console.log(ScoreClass.equalTo('objectId', 'g3dlONSIOdk6v0qi'))
//     ScoreClass.equalTo('objectId', 'g3dlONSIOdk6v0qi')
//               .fetchAll()
//               .then(function(results) {
//                 console.log(results)
//                 results.set('message', '更新した');
//                 return results.update();
//                 // console.log('Successfully retrieved ' + results.length + ' scores.');
//                 // for (var i = 0; i < results.length; i++) {
//                 //   var object = results[i];
//                 //   console.log(object.score + ' - ' + object.get('playerName'));
//                 // }
//               })
//               .then(()=>{
//                 console.log('更新完了！！！！！！')
//               })
//               .catch(function(err) {
//                 console.log(err);
//               });
    
//   };
// }

// function updateRankingDataRequest() {
//   return {
//     type: ActionType.UPDATE
//   };
// }