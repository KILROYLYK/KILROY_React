import { W } from '../../../../_Base/javascript/window';

import { createBrowserHistory, createHashHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';


/**
 * 获取默认状态
 */
import { changUserState, userInitialState } from './user';
import { changPageState, pageInitialState } from './page';

/**
 * 设置状态
 * @param {object} props 参数对象
 * @return {object} 状态对象
 */
function createInitialStore(props) {
    const { userState, pageState } = props;
    
    return createStore(
        combineReducers({
            userState: changUserState,
            pageState: changPageState
        }),
        {
            userState: userState || userInitialState,
            pageState: pageState || pageInitialState
        },
        compose(applyMiddleware(ReduxThunk))
    );
}

/**
 * 状态
 */
export const initialStore = createInitialStore({
    userState: userInitialState,
    pageState: pageInitialState
});

/**
 * 历史
 */
export const initialHistory = createHashHistory({
    basename: '/',
    forceRefresh: false,
    keyLength: 6,
    getUserConfirmation: (message, callback) => {
        W.confirm(message);
    }
});
