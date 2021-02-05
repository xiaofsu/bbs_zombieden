// 同步请求
const sRequest = require("sync-request");
// 解析html
const cheerio = require('cheerio')
//读取配置文件
var config = require('../config/config');

const BBS_ZOMBIEDN_COOKIE = config['BBS_ZOMBIEDN_COOKIE'];
const BBS_ZOMBIEDN_NAME = config['BBS_ZOMBIEDN_NAME'];
const BBS_ZOMBIEDN_FROMHASH = config['BBS_ZOMBIEDN_FROMHASH'];



/**
* @Author: xiaoFsu
* @Time: 2021.02.03 11:12:28
* 每5分钟运行1次，检测帖子里是否有自己的回复，如果没有就回复，如果有就跳过
*/

reply();

function reply() {

    const url = getUrl();
    var urlSplit = url.split("-");

    if (!urlSplit && urlSplit.length < 3) {
        console.log(` 未能解析出任何Tid数据，不进行回复。 \n 解析到的地址为：${url}`);
        return;
    }
    var isReply = getUser("", urlSplit[2], urlSplit[1]);

    console.log(`${new Date()} 是否进行回复操作：${isReply}`);

    if (isReply) {
        // 说明没有回复，则进行回复
        replyUrl(url);
    }
}


// 获取到最新的地址
function getUrl() {
    var options = {
        'headers': {
            'Cookie': BBS_ZOMBIEDN_COOKIE,
        }
    };
    var req = sRequest("GET", "https://bbs.zombieden.cn/", options);
    var $ = cheerio.load(req.getBody("utf-8"));
    newUrl = $('#portal_block_196_content').find('li').slice(0).eq(0).find('a').slice(0).eq(0).attr('href');
    return newUrl;
}




// 获取到水贴的人都是哪些
function getUser(body, index, tid) {
    // 需要将url 进行+1 操作来确保确实没有回复这个帖子
    var options = {
        'headers': {
            'Cookie': BBS_ZOMBIEDN_COOKIE,
        }
    };
    var req = sRequest("GET", `https://bbs.zombieden.cn/thread-${tid}-${index}-1.html`, options);
    const $ = cheerio.load(req.getBody("utf-8"));

    var text = $(".i.y").find('a').text();

    if (text.indexOf(BBS_ZOMBIEDN_NAME) == -1) {
        if (body != "" && body == text) {
            return true;
        } else {
            var i = Number(index);
            i++;
            return getUser(text, i, tid);
        }
    } else {
        return false;
    };
}



// 进行回复
function replyUrl(reqUrl) {

    var tid = reqUrl.split("-")[1];
    // 获取随机表情包
    var emojy = new Array('32_771', '32_772', '32_773', '32_774', '32_775', '32_776', '32_777', '32_778', '32_779', '32_780', '32_781', '32_782', '32_783', '32_784', '32_785', '32_786', '32_787', '32_788', '32_789', '32_790', '32_791', '32_792', '32_793', '32_794', '32_795', '32_796', '32_797', '32_798', '32_799', '32_800', '32_801', '32_802', '32_803', '32_804', '32_805', '32_806', '32_807', '32_808', '32_809', '32_810', '32_811', '32_812', '32_813', '32_814', '32_815', '32_816', '32_817', '32_818', '32_819', '32_820', '27_127', '27_128', '27_129', '27_130', '27_131', '27_132', '27_133', '27_134', '27_135', '27_136', '27_137', '27_138', '27_139', '27_140', '27_141', '27_142', '27_143', '27_144', '27_145', '27_146', '27_147', '27_148', '27_149', '27_150', '27_151', '27_152', '27_153', '27_154', '27_155', '27_156', '27_157', '27_158', '27_159', '27_160', '27_161', '27_162', '27_163', '34_956', '34_957', '34_958', '34_959', '34_960', '34_961', '34_962', '34_963', '34_964', '34_965', '34_966', '34_967', '34_968', '34_969', '34_970', '34_971', '34_972', '34_973', '34_974', '34_975', '34_976', '34_977', '34_978', '34_979', '34_980', '34_981', '34_982', '34_983', '34_984', '34_985', '34_986', '34_987', '34_988', '35_989', '35_990', '35_991', '35_992', '35_993', '35_994', '35_995', '35_996', '35_997', '35_998', '35_999', '35_1000', '35_1001', '35_1002', '35_1003', '35_1004', '35_1005', '35_1006', '35_1007', '35_1008', '35_1009', '35_1010', '35_1011', '35_1012', '35_1013', '35_1014', '36_1015', '36_1016', '36_1017', '36_1018', '36_1019', '36_1020', '36_1021', '36_1022', '36_1023', '36_1024', '36_1025', '36_1026', '36_1027', '36_1028', '36_1029', '36_1030', '36_1031', '36_1032', '36_1033', '36_1034', '36_1035', '36_1036', '36_1037', '36_1038', '36_1039', '36_1040', '36_1041', '36_1042', '36_1043', '36_1044', '36_1045', '36_1046', '36_1047', '37_1048', '37_1049', '37_1050', '37_1051', '37_1052', '37_1053', '37_1054', '37_1055', '37_1056', '37_1057', '37_1058', '37_1059', '37_1060', '37_1061', '37_1062', '37_1063', '37_1064', '37_1065', '37_1066');

    var options = {
        // 这个tid 是需要获取到url中的 id，要不要会一直回复一个的
        url:
            "https://bbs.zombieden.cn/forum.php?mod=post&action=reply&fid=140&tid=" + tid + "&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-fetch-dest": "iframe",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            // 这里获取到SECRETES 中的值
            cookie: BBS_ZOMBIEDN_COOKIE,
        },
        referrer: reqUrl,
        referrerPolicy: "strict-origin-when-cross-origin",
        body:
            "file=&message=%7B%3A" + emojy[Math.floor(Math.random() * (emojy.length) + 1)] +
            "%3A%7D&posttime=" + new Date().getTime() / 1000 + "&formhash=" + BBS_ZOMBIEDN_FROMHASH + "&usesig=1&subject=++",
        method: "POST",
        mode: "cors",
    };


    var req = sRequest(options.method, options.url, options);
    if (req.getBody("utf-8").indexOf("回复发布成功")) {
        console.log(` 回复成功。\n 回复地址：${options.url}`);
    } else {
        console.error(` 回复失败。\n 回复地址：${options.url}`)
    }

    console.log();

}

module.exports = {
    reply
}