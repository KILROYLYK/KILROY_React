/**
 * 域名
 */
const domainRoute = {
    common: '/api/decks',
    local: 'http://119.28.184.34',
    test: 'http://gwent-test.playgwent.cn/api/decks',
    formal: 'https://playgwent.cn/api/decks'
};
export const domain = domainRoute.test;
// export const domain = domainRoute.formal;

/**
 * 接口
 */
export const interfaceRoute = {
    echo: '/echo', //打印消息
    image: '/images', //获取图片
    userinfo: '/userinfo', //获取登录状态及用户信息
    like: '/like', //获取登录状态及用户信息
    leaders: '/leaders', //获取阵营及领袖
    getdecks: '/getdecks', //获取牌组列表
    getdeck: '/getdeck', //获取牌组
    moddeck: '/moddeck', //修改牌组
    deldeck: '/deldeck' //删除牌组
};
