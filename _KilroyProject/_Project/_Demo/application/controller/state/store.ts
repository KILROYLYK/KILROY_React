import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory, createHashHistory } from 'history';

import Global from '../../constant/_global';
import { changUserState, userInitialState } from './user.ts';
import { changPageState, pageInitialState } from './page.ts';

/**
 * ηΆζ
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
 * εε²
 */
export const initialHistory = createHashHistory({
    window: Global.W
});
