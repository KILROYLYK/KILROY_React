/**
 * React
 */
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
export default function createInitialStore(props) {
    const {userState, pageState} = props;
    
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
