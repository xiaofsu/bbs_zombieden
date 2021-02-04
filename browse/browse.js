// 异步请求
const request = require('request');
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

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        console.log(`访问地址：${options.url}`);
        console.log(`访问状态: ${response.statusCode}`);
    });
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