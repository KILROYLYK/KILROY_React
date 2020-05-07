import Global from '../../constant/global';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory, createHashHistory } from 'history';

/**
 * 获取默认状态
 */
import { changUserState, userInitialState } from './user.ts';
import { changPageState, pageInitialState } from './page.ts';

/**
 * 状态
 */
export const initialStore = createStore(
    combineReducers({
        userState: changUserState,
        pageState: changPageState
    }),
    {
        userState: userInitialState,
        pageState: pageInitialState
    },
    compose(applyMiddleware(ReduxThunk))
);

/**
 * 历史
 */
export const initialHistory = createHashHistory({
    basename: '/',
    forceRefresh: false,
    keyLength: 6,
    getUserConfirmation: (message, callback) => {
        Global.Window.confirm(message);
    }
});
