const schedule = require('node-schedule');

var replyNum = 0, signNum = 0, browseNum = 0;
var reply, browse, sign;

// 每5分钟check一下需不需要回复
schedule.scheduleJob('23 0/1 * * * *', () => {
    console.log(`${new Date()} 开始执行 reply操作`);
    replyNum++;
    console.log(`第 ${replyNum} 次访问`);
    if (replyNum <= 1) {
        reply = require("./reply/reply.js");
    } else {
        reply.reply();
    }
});

// 每日1点执行浏览他人主页任务
schedule.scheduleJob('0 0 1 * * *', () => {
    console.log(`${new Date()} 开始执行 browse操作`);
    browseNum++;
    if (browseNum <= 1) {
        browse = require("./browse/browse.js");
    } else {
        browse.browse();
    }
});

// 每日0点执行登陆操作
schedule.scheduleJob('0 0 0 * * *', () => {
    console.log(`${new Date()} 开始执行 sign操作`);
    signNum++;
    if (signNum <= 1) {
        sign = require("./sign/sign.js");
    } else {
        sign.sign();
    }
});