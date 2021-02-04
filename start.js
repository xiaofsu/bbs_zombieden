const schedule = require('node-schedule');

// 每5分钟check一下需不需要回复
schedule.scheduleJob('0 0/5 * * * *', () => {
    console.log(`${new Date()} 开始执行 reply操作`);
    require("./reply/reply.js");
});

// 每日1点执行浏览他人主页任务
schedule.scheduleJob('0 0 1 * * *', () => {
    console.log(`${new Date()} 开始执行 browse操作`);
    require("./browse/browse.js");
});

// 每日0点执行登陆操作
schedule.scheduleJob('0 5 0 * * *', () => {
    console.log(`${new Date()} 开始执行 sign操作`);
    require("./sign/sign.js");
});