/**
 * 默认状态
 */
export const pageInitialState = {
    name: 'index'
};

/**
 * 更改页面状态
 * @param {object} state 用户状态
 * @param {object} action 活动状态
 * @return {object} 更新状态
 */
export function changPageState(state = pageInitialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
