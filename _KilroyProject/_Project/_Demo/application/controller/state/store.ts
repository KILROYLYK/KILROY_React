import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory, createHashHistory } from 'history';

import Global from '../../constant/_global';
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
    window: Global.W
});
