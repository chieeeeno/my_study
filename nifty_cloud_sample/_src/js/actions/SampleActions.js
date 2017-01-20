import Axios from 'axios';
// import NCMB from 'ncmb';

import NcmbUtil from '../util/NcmbUtil';
import * as ActionType from '../constants/ActionType';

export function loadData(url) {
  console.log(url)
  return dispatch => {
    dispatch(loadDataRequest());
    Axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then((response)=>{
      console.log(response.data)
      dispatch(loadDataResult(response.data))
    }).catch((error)=>{
      alert('error')
      console.error('loadData',error)
      dispatch(loadDataResult(false))
    })
  };
}

function loadDataRequest() {
  return {
    type: ActionType.LOAD_DATA_REQUEST
  };
}

function loadDataResult(result) {
  return {
    type: ActionType.LOAD_DATA_RESULT,
    result,
  };
}


const APPLICATION_KEY = 'e1dc60025a6de2e19ab910aa8573bfba16ec34aa8ed93d536327f30ad0adc96c';
const CLIENT_KEY = 'ca38c6bb12358e887a4f4f8ca756fa979e65eb46439429a33839b26868b2411f';
export function saveScore(_data,_callback) {
  console.log('saveScore()',_data)
  return dispatch => {
    dispatch(saveScoreRequest());
    let ncmbUtil = new NcmbUtil(APPLICATION_KEY,CLIENT_KEY,'ScroeClass');
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