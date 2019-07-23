/**
 * Public
 */
import { getUserInfo, delUserInfo } from '../controller/window';

/**
 * 默认状态
 */
export const userInitialState = {
    show: false,
    nickname: '',
    email: '',
    phone: '',
    sex: '',
    avatar: ''
};

/**
 * 更改用户状态
 * @param {object} state 用户状态
 * @param {object} action 活动状态
 * @return {object} 更新状态
 */
export function changUserState(state = userInitialState, action) {
    switch (action.type) {
        case 'SET_LOGIN':
            const user = getUserInfo();
            user.show = true;
            return user || userInitialState;
        case 'SET_LOGOUT':
            delUserInfo();
            userInitialState.show = true;
            return userInitialState;
        default:
            return state;
    }
}
