/**
 * 默认状态
 */
export const userInitialState = {
    name: 'KILROY'
};

/**
 * 更改用户状态
 * @param {object} state 用户状态
 * @param {object} action 活动状态
 * @return {object} 更新状态
 */
export function changUserState(state = userInitialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
