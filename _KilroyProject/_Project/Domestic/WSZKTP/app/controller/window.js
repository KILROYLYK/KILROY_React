/**
 * Public
 */
import { W, $, GaeaAjax, Base } from '../../../../_Base/js/window';
import { domain, interfaceRoute } from '../constant/interface';
import { userCookie } from '../constant/cookie';
import { userInitialState } from '../state/user';

/**
 * 获取当前窗口宽度
 * @return {number} 返回屏幕宽度
 */
export const winWidth = () => {
    return $(W).width();
};

/**
 * 获取当前窗口高度
 * @return {number} 返回屏幕宽度
 */
export const winHeight = () => {
    return $(W).height();
};

/**
 * 获取窗口滚动位置
 * @return {number} 返回滚动位置
 */
export const winScroll = () => {
    return $(W).scrollTop();
};

/**
 * 滚动到顶部
 * @param {number} top 滚动位置
 * @return {void}
 */
export const scrollTop = (top) => {
    $('html, body').scrollTop(top);
};

/**
 * 检查用户信息
 * @param {object} store 状态
 * @return {void}
 */
export const inspectionUserInfo = (store) => {
    GaeaAjax.commonAjax(
        'get',
        domain + interfaceRoute.userinfo,
        {},
        (result) => {
            if (result.nickname === '' &&
                result.email === '' &&
                result.phone === '') {
                store.dispatch({
                    type: 'SET_LOGOUT'
                });
            } else {
                Base.cookie.set(userCookie, JSON.stringify({
                    nickname: result.nickname,
                    sex: result.sex,
                    email: result.email,
                    phone: result.phone,
                    avatar: result.avatar
                }), 100);
                store.dispatch({
                    type: 'SET_LOGIN'
                });
            }
        }
    );
};

/**
 * 获取用户信息
 * @return {object} 用户信息
 */
export const getUserInfo = () => {
    return JSON.parse(Base.cookie.get(userCookie));
};

/**
 * 清除用户信息
 * @return {void}
 */
export const delUserInfo = () => {
    Base.cookie.set(userCookie, JSON.stringify({
        nickname: userInitialState.nickname,
        sex: userInitialState.sex,
        email: userInitialState.email,
        phone: userInitialState.phone,
        avatar: userInitialState.avatar
    }), 100);
    // Base.cookie.del(userCookie);
};

/**
 * 判断平台
 * @return {string} 返回平台
 */
export const platform = () => {
    const media = W.matchMedia('(min-width:1200px)');
    
    if (media.matches) {
        return 'pc';
    } else {
        return 'mobile';
    }
};

/**
 * PC端
 * @return {boolean} 是否是PC端
 */
export const isPC = () => {
    if (platform() === 'pc') return true;
    return false;
};

/**
 * Mobile端
 * @return {boolean} 是否是Mobile端
 */
export const isMobile = () => {
    if (platform() === 'mobile') return true;
    return false;
};

/**
 * 判断用户登录
 * @return {boolean} 是否登录
 */
export const isLogin = () => {
    const user = JSON.parse(Base.cookie.get(userCookie));
    
    if (user.nickname || user.email || user.phone) return true;
    
    return false;
};

/**
 * 获取图片
 * @param {number|string} id 图片ID
 * @return {string} 图片地址
 */
export const getImage = (id) => {
    return domain + interfaceRoute.image + '/' + id + '.jpeg';
};

