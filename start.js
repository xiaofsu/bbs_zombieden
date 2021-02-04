const { exec } = require('child_process');

const reply = 'nohup sh /zombieden/reply/reply.sh';
const sign = 'nohup sh /zombieden/sign/sign.sh';
const browse = 'nohup sh /zombieden/browse/browse.sh';

const schedule = require('node-schedule');

// 每5分钟check一下需不需要回复
schedule.scheduleJob('0 0/5 * * * *', () => {
    console.log(`${new Date()} 开始执行 reply操作`);
    exec(reply, (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err)
        }
    })
});

// 每日1点执行浏览他人主页任务
schedule.scheduleJob('0 0 1 * * *', () => {
    console.log(`${new Date()} 开始执行 browse操作`);
    exec(browse, (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err)
        }
    })
});

// 每日0点执行登陆操作
schedule.scheduleJob('0 5 0 * * *', () => {
    console.log(`${new Date()} 开始执行 sign操作`);
    exec(sign, (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err)
        }
    })
});