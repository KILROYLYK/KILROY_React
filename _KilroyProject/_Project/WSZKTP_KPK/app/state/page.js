/**
 * Public
 */
import { platform, winScroll } from '../controller/window';

/**
 * 默认状态
 */
export const pageInitialState = {
    platform: platform(),
    scroll: winScroll(),
    loading: false
};

/**
 * 更改页面状态
 * @param {object} state 用户状态
 * @param {object} action 活动状态
 * @return {object} 更新状态
 */
export function changPageState(state = pageInitialState, action) {
    switch (action.type) {
        case 'SET_PLATFORM'://切换PC和Mobile
            state.platform = platform();
            return state;
        case 'SET_SCROLL'://滚动条位置
            state.scroll = winScroll();
            return state;
        case 'OPEN_LOADING'://打开Loading
            state.loading = true;
            return state;
        case 'CLOSE_LOADING'://关闭Loading
            state.loading = false;
            return state;
        default:
            return state;
    }
}
