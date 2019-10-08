/**
 * Public
 */
import { $, W } from '../../../../_Base/js/window';
import { href } from '../../constant/href';
import { inspectionUserInfo } from '../../controller/window';

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
            nickname: userState.nickname,
            email: userState.email,
            phone: userState.phone,
            sex: userState.sex,
            avatar: userState.avatar
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
                        _this.state.nickname || _this.state.email || _this.state.phone
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
            const {userState: newUserState} = store.getState();
            
            _this.setState({
                show: newUserState.show,
                nickname: newUserState.nickname,
                email: newUserState.email,
                phone: newUserState.phone,
                sex: newUserState.sex,
                avatar: newUserState.avatar
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
                    <a href={href._void}
                       onClick={
                           _this.clickSwitchPopupPopup.bind(_this)
                       }>登录</a>
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
            userinfo = _this.state.email ||
                _this.state.nickname ||
                _this.state.phone;
        
        if (_this.state.show) {
            return (
                <div className="box_logout">
                    <p>您好！{userinfo}</p>
                    <a className="logout"
                       href={href._void}
                       onClick={_this.clickLogout.bind(_this)}>退出登录</a>
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
