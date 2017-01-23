import NCMB from 'ncmb';

import * as Constants from '../constants/Constants';

let ncmb;
let DataClass
let dataClass;
let self;
let currentUserData;

class NcmbUtil {
  constructor(appKey,clientKey) {
    console.log('NcmbUtil constructor');
    self = this;
    ncmb = new NCMB(appKey,clientKey);
    // DataClass = ncmb.DataStore(dataClassName);
    DataClass = ncmb.DataStore(Constants.DATA_CLASS_NAME);
    dataClass = new DataClass();

  }

  /**
   * ランキングデータを保存する
   * @param {Object} ランキングに保存する情報
   */
  saveScore(param) {
    console.log('NcmbUtil saveScore',param);
    self._isFunction(param.beforeSaveCallback) ? param.beforeSaveCallback():'';
    dataClass.set('level', param.level)
             .set('username', param.username)
             .set('score', param.score);
    dataClass.save()
      .then((res)=> {
        // 保存に成功した場合の処理
        console.log('保存に成功しました。');
        console.log(res)
        self._isFunction(param.successClallback) ? param.successClallback():'';
      })
      .catch((err)=> {
        // 保存に失敗した場合の処理
        console.log('保存に失敗しました。エラー:' + err); 
        self._isFunction(param.failClallback) ? param.failClallback():'';
      });
  }

  /**
   * ランキングデータを取得する
   */
  loadRanking() {
    console.log('NcmbUtil loadRanking');
    return new Promise((resolve, reject)=> {
      DataClass.order('score', true)
        // .limit(5)
        .fetchAll()
        .then((results)=> {
          //ランキング取得後の処理
          // console.log('ランキングの取得に成功しました。');
          let rankArray = self._addRankingNumber(results)
          resolve(rankArray)
        })
        .catch((err)=> {
          //エラー時の処理
          // console.log('ランキングの取得に失敗しました。エラー:' + err); 
          // console.log(err)
          reject(err)
        });
    });
  }


  /**
   * ユーザーを登録する
   */
  // registerUser() {
  //   console.log('NcmbUtil registerUser');
  //   return new Promise((resolve, reject)=> {
  //     ncmb.User.loginAsAnonymous()
  //       .then((data)=>{
  //         // ログイン後処理
  //         console.log(data)
  //         resolve(data)
  //       })
  //       .catch((err)=>{
  //         // エラー処理
  //         console.error(err)
  //         reject(err)
  //       });
  //   });
  // }


  /**
   * ユーザーを登録する
   */
  registerUser(_username) {
    console.log('NcmbUtil registerUser',_username);
    return new Promise((resolve, reject)=> {
      let uuid = self._generateDummyUUID();
      let user = new ncmb.User({
        userName:uuid,
        password:uuid,
        displayName:_username
      });
      console.log('NcmbUtil registerUser ncmb.User',ncmb.User);
      console.log('NcmbUtil registerUser user',user);
      user.signUpByAccount()
        .then((user)=>{
          console.log(user)
          resolve(user)
        })
        .catch((err)=>{
          // エラー処理
          console.error(err)
          reject(err)
        });

    });
  }




  login(_username) {
    console.log('NcmbUtil login',_username);
    return new Promise((resolve, reject)=> {
      let userName = localStorage.getItem(Constants.APP_PREFIX+'-userName');

      if(!userName) {
        // ユーザーを作成したことがない
        console.log('ユーザーなし')
        self.registerUser(_username).then((response)=>{
          console.log('login success(ユーザーなし)!!',response)
          resolve(response)
        }).catch((err)=>{
          console.error('login fail(ユーザーなし)!!!!!!!',err)
          reject(err)
        })
      } else if(!currentUserData) {  // ログアウト状態：userNameとパスワードでログイン
        ncmb.User.login(userName, userName)
          .then((user)=>{
            currentUserData = user;
            self._refreshCurrentUser(()=>{
              console.log('login success(ログアウト状態)!!',user)
              resolve(user)
            });
          })
          .catch((err)=>{
            console.error('login fail(ログアウト状態)!!!!!!!',err)
            reject(err)
          })
      } else {  // ログアウトしていない（前のログインデータが残っている）
        currentUserData = ncmb.User.getCurrentUser();

        // userオブジェクトを使用してログイン
        ncmb.User.login(currentUserData)
          .then((user)=> {
            // ログイン後：ユーザーデータの更新
            currentUserData = user;
            self._refreshCurrentUser(()=>{
              console.log('login success(ログアウトしていない（前のログインデータが残っている）)!!',user)
              resolve(user)
            });
          })
          .catch((err)=>{
            console.error('login fail(ログアウトしていない（前のログインデータが残っている）)!!!!!!!',err)
            reject(err)
          })
      }


      
    });
  }

  /**
   * UUIDが存在すればログイン、しなければ新規作成
   */
  // loginWithUUID() {
  //   console.log('NcmbUtil loginWithUUID');
  //   let userName = localStorage.getItem(Constants.APP_PREFIX+'-userName');
  //   if(!userName) {
  //     // ユーザーを作成したことがない
  //     console.log('ユーザーなし')
  //     this.registerUser()
  //   } else if(!currentUserData) {
  //     // ログアウト状態：userNameとパスワードでログイン
  //     ncmb.User.login(userName, userName)
  //       .then((user)=>{
  //         currentUserData = user;
  //         self._refreshCurrentUser();
  //       }).catch((err)=>{
  //         // 失敗した場合：ユーザー作成
  //         console.log(err);
  //         // self.registerUser();
  //       })
  //   } else {
  //     // ログアウトしていない（前のログインデータが残っている）
  //     currentUserData = ncmb.User.getCurrentUser();
  //     // userオブジェクトを使用してログイン
  //     ncmb.User.login(currentUserData)
  //       .then((user)=> {
  //           // ログイン後：ユーザーデータの更新
  //         currentUserData = user;
  //         self._refreshCurrentUser();
  //       })
  //       .catch((err)=> {
  //           // セッション切れの場合はログアウトして再ログイン
  //         console.log(err);
  //         ncmb.User.logout();  // ログアウト
  //         currentUserData = null;
  //         self.loginWithUUID();       // 再ログイン
  //       });
  //   }
  // }

  /**
   * currentUserプロパティを更新する
   */
  _refreshCurrentUser(_callback) {
    console.log('NcmbUtil _refreshCurrentUser');
    if(!currentUserData) return;
    
    // オブジェクトIDを用いてユーザーを検索（fetchById）
    ncmb.User.fetchById(currentUserData.get('objectId'))
      .then((user)=> {
        currentUserData = user;
      })
      .catch((err)=> {
        console.log(err);
        currentUserData = null;
      })
      .then(()=>{
        if(_callback && typeof _callback === 'function') {
          console.log('NcmbUtil _refreshCurrentUser callback load!!');
          _callback()
        }
      });

  }

  /**
   * ダミーのUUIDを生成する
   * @return {Array}  ダミーUUID
   */
  _generateDummyUUID() {
    let S4 = function(){
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    let uuid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    return uuid;
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