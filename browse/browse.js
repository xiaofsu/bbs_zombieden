// 同步请求
const sRequest = require("sync-request");
// 解析html
const cheerio = require('cheerio')
//读取配置文件
var config = require('../config/config');


const BBS_ZOMBIEDN_COOKIE = config['BBS_ZOMBIEDN_COOKIE'];


/**
* @Author: xiaoFsu
* @Time: 2021.02.04 9:44:34
* 每周访问10次别人空间获得僵尸币 ，多访问几个防止有失效的用户
*/
browse();

// 访问别人空间
function browse() {
    for (var i = 0; i < 15; i++) {
        setTimeout(function () {
            var userId = getUserId();
            linkUser(userId);
        }, getUserId() / 10);
    }
    // 访问一下我的
    linkUser(74138);
}

// 请求访问
function linkUser(userId) {
    console.log(`${new Date()} 访问他人空间。`);
    var options = {
        url: `https://bbs.zombieden.cn/space-uid-${userId}.html`,
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": BBS_ZOMBIEDN_COOKIE
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    }

    var req = sRequest(options.method, options.url, options);
    var $ = cheerio.load(req.getBody("utf-8"));
    var href = $("#pt").find('a').slice(0).eq(1).attr('href');
    var user = $("#pt").find('a').slice(0).eq(1).text();
    if (href || user) {
        console.log(` 访问成功。\n 访问用户：${user} \n 访问地址：${href}`);
    } else {
        console.error(` 访问失败。\n 访问地址：${options.url}`)
    }
    console.log();
}

// 获取随机的用户ID
function getUserId() {
    var Max = 74138;
    var Min = 10000;    // 比10000小的可能不存在用户，例如00002，所以也需要多访问几个用户确保可以拿到僵尸币
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

module.exports = {
    browse
}