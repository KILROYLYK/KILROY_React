/**
 * 服务器类型
 */
const server = 'test';

/**
 * 接口域名
 */
const domainCommon = {
    test: 'http://acts-test.gaeamobile.net',
    formal: 'https://acts.gaeamobile.net',
    officialTest: 'http://gwent-test.playgwent.cn',
    officialFormal: 'https://www.playgwent.cn'
};
export const domain = domainCommon[server];

/**
 * 官网域名
 */
const officialCommon = {
    test: 'http://gwent-test.playgwent.cn',
    formal: 'https://www.playgwent.cn'
};
export const official = officialCommon[server];

/**
 * 接口地址
 */
const interfaceCommon = '/gwent-decks';
export const interfaceRoute = {
    userInfo: '/sso/check-login', //获取登录状态及用户信息
    image: interfaceCommon + '/gwent-decks-img', //获取图片
    like: interfaceCommon + '/like', //点赞
    leaders: interfaceCommon + '/leaders', //获取阵营及领袖
    getDecks: interfaceCommon + '/getdecks', //获取牌组列表
    getDeck: interfaceCommon + '/getdeck', //获取牌组
    modDeck: interfaceCommon + '/moddeck', //修改牌组
    delDeck: interfaceCommon + '/deldeck' //删除牌组
};
