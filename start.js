const schedule = require('node-schedule');

var replyNum = 0, signNum = 0, browseNum = 0;

// 每5分钟check一下需不需要回复
schedule.scheduleJob('0 0/5 * * * *', () => {
    console.log(`${new Date()} 开始执行 reply操作`);
    replyNum++;
    console.log(`第 ${replyNum} 次访问`);
    if (replyNum <= 1) {
        require("./reply/reply.js");
    } else {
        var reply = require("./reply/reply.js");
        reply.reply();
    }
});

// 每日1点执行浏览他人主页任务
schedule.scheduleJob('0 0 1 * * *', () => {
    console.log(`${new Date()} 开始执行 browse操作`);
    browseNum++;
    if (browseNum <= 1) {
        require("./browse/browse.js");
    } else {
        var browse = require("./browse/browse.js");
        browse.browse();
    }
});

// 每日0点执行登陆操作
schedule.scheduleJob('0 5 0 * * *', () => {
    console.log(`${new Date()} 开始执行 sign操作`);
    signNum++;
    if (signNum <= 1) {
        require("./sign/sign.js");
    } else {
        var sign = require("./sign/sign.js");
        sign.sign();
    }
});