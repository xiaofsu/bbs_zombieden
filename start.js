const { exec } = require('child_process');

const reply = 'sh /zombieden/reply/reply.sh';
const sign = 'sh /zombieden/sign/sign.sh';
const browse = 'sh /zombieden/browse/browse.sh';

const schedule = require('node-schedule')

// 每5分钟check一下需不需要回复
schedule.scheduleJob('0 0/5 * * * *', () => {
    exec(reply, (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err)
        }
    })
})

// 每日1点执行浏览他人主页任务
schedule.scheduleJob('0 0 1 * * *', () => {
    exec(browse, (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err)
        }
    })
})

// 每日0点执行登陆操作
schedule.scheduleJob('0 5 0 * * *', () => {
    exec(sign, (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err)
        }
    })
})