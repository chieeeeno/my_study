import NCMB from 'ncmb';

let ncmb;
let DataClass
let dataClass;
let _this;

class NcmbUtil {
  constructor(appKey,clientKey,dataClassName) {
    console.log('NcmbUtil constructor');
    _this = this;
    ncmb = new NCMB(appKey,clientKey);
    DataClass = ncmb.DataStore(dataClassName);
    dataClass = new DataClass();
  }

  /**
   * ランキングデータを保存する
   * @param {Object} ランキングに保存する情報
   */
  saveScore(param) {
    console.log('NcmbUtil saveScore',param);
    _this._isFunction(param.beforeSaveCallback) ? param.beforeSaveCallback():'';
    dataClass.set('level', param.level);
    dataClass.set('username', param.username);
    dataClass.set('score', param.score);
    dataClass.save()
      .then((res)=> {
        // 保存に成功した場合の処理
        console.log('保存に成功しました。');
        console.log(res)
        _this._isFunction(param.successClallback) ? param.successClallback():'';
      })
      .catch((err)=> {
        // 保存に失敗した場合の処理
        console.log('保存に失敗しました。エラー:' + err); 
        _this._isFunction(param.failClallback) ? param.failClallback():'';
      });
  }

  /**
   * ランキングデータを取得する
   */
  loadRanking() {
    console.log('NcmbUtil loadRanking');
    return new Promise(function(resolve, reject) {
      DataClass.order('score', true)
        // .limit(5)
        .fetchAll()
        .then(function(results) {
          //ランキング取得後の処理
          // console.log('ランキングの取得に成功しました。');
          let rankArray = _this._addRankingNumber(results)
          resolve(rankArray)
        })
        .catch(function(err) {
          //エラー時の処理
          // console.log('ランキングの取得に失敗しました。エラー:' + err); 
          // console.log(err)
          reject(err)
        });
    });
  }


  /**
   * ランキングデータに順位の番号を付与する
   * @param {Array}  ランキングデータ
   * @return {Array}  順位を付与したランキングデータ
   */
  _addRankingNumber(scores) {
    // console.log('scores',scores)
    let count;
    let tmp;
    let response = [];
    scores.forEach( ( item, index ) => {
      if ( item.score !== tmp ) {
        count = index + 1;
        tmp = item.score;
      }
      response.push({
        count:count,
        username:item.username,
        score:item.score
      })
      console.log( 'count:', count, ', name:', item.username, ', score:', item.score );
    } );
    return response;
  }

  /**
   * 実行できる関数かどうかを判定する
   * @param {Function}  判定する関数
   * @return {Boolean}
   */
  _isFunction(func) {
    if(func && typeof func ==='function') {
      return true;
    }else{
      return false;
    }
  }

}

export default NcmbUtil;