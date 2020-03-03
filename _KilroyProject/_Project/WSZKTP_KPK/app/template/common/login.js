/**
 * Public
 */
import { $, W } from '../../../../_Base/javascript/window';
import { href } from '../../constant/href';
import { inspectionUserInfo, isLogin } from '../../controller/window';

/**
 * Style
 */
import '../../../src/css/login.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * LoginComponent
 */
export default class loginComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            {store} = _this.props,
            {userState} = store.getState();
        
        _this.state = {
            switchPopup: false,
            show: userState.show,
            id: userState.id,
            token: userState.token,
            email: userState.email,
            nickname: userState.nickname,
            phone: userState.phone,
            avatar: userState.avatar,
            sex: userState.sex
        };
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            {store} = _this.props;
        
        return (
            <Provider store={store}>
                <div className="login">
                    <i id="loginBefore" />
                    <i id="loginAfter"><i /></i>
                    {
                        isLogin()
                            ? _this.createLogout()
                            : _this.createLogin()
                    }
                    {_this.createPopupLogin()}
                </div>
            </Provider>
        );
    }
    
    /**
     * 组件安装回调
     * @return {void}
     */
    componentDidMount() {
        const _this = this,
            {store} = _this.props;
        
        _this.update = store.subscribe(() => {
            const {userState} = store.getState();
            
            _this.setState({
                show: userState.show,
                id: userState.id,
                token: userState.token,
                email: userState.email,
                nickname: userState.nickname,
                phone: userState.phone,
                avatar: userState.avatar,
                sex: userState.sex
            });
        });
        
        W.countDown = () => {
            setTimeout(() => {
                parent.location.reload();
            }, 1500);
        };
    }
    
    /**
     * 组件更新回调
     * @return {void}
     */
    componentDidUpdate() {
        const _this = this;
    }
    
    /**
     * 组件卸载回调
     * @return {void}
     */
    componentWillUnmount() {
        const _this = this;
        
        _this.update();
    }
    
    /******组件事件******/
    
    /**
     * 创建登录框
     * @return {object} Dom对象
     */
    createLogin() {
        const _this = this;
        if (_this.state.show) {
            return (
                <div className="box_login">
                    <button onClick={
                        _this.clickSwitchPopupPopup.bind(_this)
                    }>登录
                    </button>
                    <span>或者</span>
                    <a href={href.register} target="_blank">注册</a>
                </div>
            );
        } else {
            return null;
        }
    }
    
    /**
     * 创建登录弹窗
     * @return {object} Dom对象
     */
    createPopupLogin() {
        const _this = this,
            {store} = _this.props;
        
        return (
            <div className={'login_popup' + (
                _this.state.switchPopup
                    ? ' active'
                    : ''
            )}>
                <iframe id="idLoginIframe" src={href.login}
                        rameborder="0" scrolling="no"
                        onLoad={() => {
                            inspectionUserInfo(store);
                        }} />
            </div>
        );
    }
    
    /**
     * 创建退出登录框
     * @return {object} Dom对象
     */
    createLogout() {
        const _this = this,
            user = _this.state.email ||
                _this.state.nickname ||
                _this.state.phone ||
                _this.state.id;
        
        if (_this.state.show) {
            return (
                <div className="box_logout">
                    <p>您好！{user}</p>
                    <button className="logout"
                            onClick={_this.clickLogout.bind(_this)
                            }>退出登录
                    </button>
                </div>
            );
        } else {
            return null;
        }
    }
    
    /******点击事件******/
    
    /**
     * 点击登录弹窗开关
     * @return {void}
     */
    clickSwitchPopupPopup() {
        const _this = this;
        
        if (_this.state.switchPopup) {
            _this.setState({
                switchPopup: false
            });
        } else {
            _this.setState({
                switchPopup: true
            });
        }
    }
    
    /**
     * 退出登录
     * @return {void}
     */
    clickLogout() {
        const _this = this,
            {store} = _this.props;
        
        store.dispatch({
            type: 'SET_LOGOUT'
        });
        
        $('#idLoginIframe').attr('src', href.logout);
    }
}
