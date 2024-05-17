var oauth = require("oauth");
let conf = {
  plurk: {
    consumerKey: "", // modify for your own APP
    consumerSecret: "" // modify for your own APP
  }
};

let firstpath = "https://www.plurk.com";

let oa = new oauth.OAuth("https://www.plurk.com/OAuth/request_token",
  "https://www.plurk.com/OAuth/access_token",
  conf.plurk.consumerKey,
  conf.plurk.consumerSecret,
  "1.0",
  null,
  "HMAC-SHA1");

$.fn.oAuthGetRequest = () => {
  return new Promise((resolve, reject) => {
    oa.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
      chrome.storage.local.set({
        "token": oauth_token,
        "secret": oauth_token_secret
      }, () => {
        resolve( oauth_token );
      });
    });
  })

}

$.fn.oAuthGetAccess = (oAuthCode) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([ //取得瀏覽器擴充本地儲存
      "token",
      "secret"
    ], async (result) => {
      oa.getOAuthAccessToken(result.token, result.secret, oAuthCode, (error, oauth_token, oauth_token_secret, results) => {
        chrome.storage.local.set({
          "token": oauth_token,
          "secret": oauth_token_secret
        }, () => {
          resolve({ "code": "200", "message": "完成連結" });
        });
      });

    });
  })
}

$.fn.postApi = (path, params, callback) => {
  chrome.storage.local.get([ //取得瀏覽器擴充本地儲存
    "token",
    "secret"
  ], async (result) => {
    //api 使用
    oa.post(firstpath + path,
      result.token,
      result.secret,
      params,
      "application/json",
      callback

    );
  });
}

$.fn.getApi = (path) => {
  chrome.storage.local.get([ //取得瀏覽器擴充本地儲存
    "token",
    "secret"
  ], async (result) => {
    //api 使用
    oa.get(firstpath + path,
      result.token,
      result.secret,
      "application/json",
      (error, data, ress) => {
        resolve(error, data, ress);

      }
    );
  });
}

