// 同步请求
const sRequest = require("sync-request");
// 异步请求
const request = require('request');
// 加密组件
const crypto = require('crypto');

//读取配置文件
var config = require('../config/config');

const BBS_ZOMBIEDN_COOKIE = config['BBS_ZOMBIEDN_COOKIE'];
const BBS_ZOMBIEDN_NAME = config['BBS_ZOMBIEDN_NAME'];
const BBS_ZOMBIEDN_FROMHASH = config['BBS_ZOMBIEDN_FROMHASH'];
const DD_TOKEN = config['DD_TOKEN'];
const DD_SECRET = config['DD_SECRET'];



/**
* @Author: xiaoFsu
* @Time: 2021.02.03 11:12:00
* 每天运行一次来进行回复&签到&抽奖
*/

sign();

function sign() {
  if (BBS_ZOMBIEDN_COOKIE && BBS_ZOMBIEDN_NAME) {

    // todo 这个不是摇一摇的接口
    // lottery();

    //每日签到
    sign();

    //todo 获取到每个操作是否成功来进行推送
    if (DD_TOKEN && DD_SECRET) {
      //推送到钉钉 
      ddBotNotify("僵尸乐园 BBS 操作成功！");
    }
  }
}


// 进行抽奖
function lottery() {
  fetch("https://bbs.zombieden.cn/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall&yjjs=yes", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "max-age=0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "upgrade-insecure-requests": "1",
      "cookie": BBS_ZOMBIEDN_COOKIE
    },
    "referrer": "https://bbs.zombieden.cn/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

};



// 每日签到
function sign() {
  var options = {
    "url": "https://bbs.zombieden.cn/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1",
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "iframe",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: BBS_ZOMBIEDN_COOKIE,
    },
    "referrer": "https://bbs.zombieden.cn/plugin.php?id=dsu_paulsign:sign",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `formhash=${BBS_ZOMBIEDN_FROMHASH}&qdxq=shuai`,
    "method": "POST",
    "mode": "cors"
  }

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    console.log(`访问地址：${options.url}`);
    console.log(`访问状态：${response.statusCode}`);
  });
};





// 发送钉钉消息
function ddBotNotify(text) {
  var url = `https://oapi.dingtalk.com/robot/send?access_token=${DD_TOKEN}`;
  const options = {
    json: {
      "msgtype": "text",
      "text": {
        "content": ` ${text}`
      }
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (DD_TOKEN && DD_SECRET) {
    const dateNow = Date.now();
    const hmac = crypto.createHmac('sha256', DD_SECRET);
    hmac.update(`${dateNow}\n${DD_SECRET}`);
    const result = encodeURIComponent(hmac.digest('base64'));
    url = `${url}&timestamp=${dateNow}&sign=${result}`;
    sRequest("POST", `${url}`, options);
  }
}


module.exports = {
  sign
}