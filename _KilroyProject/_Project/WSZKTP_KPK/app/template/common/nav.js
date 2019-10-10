/**
 * Public
 */
import { platform, isPC, isMobile } from '../../controller/window';
import { nav } from '../../constant/nav';

/**
 * Style
 */
import '../../../src/css/nav.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * NavComponent
 */
export default class navComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            {store} = _this.props,
            {pageState} = store.getState();
        
        _this.state = {
            platform: pageState.platform,
            scroll: pageState.scroll,
            shadow: 150,
            mobileOpen: false
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
                <nav className={'nav ' + platform() +
                (isPC() && _this.state.scroll >= _this.state.shadow ? ' active' : '') +
                (isMobile() && _this.state.mobileOpen ? ' active' : '')}>
                    {_this.createNavList()}
                </nav>
                {_this.createMobileBtnMenu()}
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
            const {pageState: newPageState} = store.getState();
            
            _this.setState({
                platform: newPageState.platform,
                scroll: newPageState.scroll
            });
        });
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
     * 创建导航列表
     * @return {object|null} Dom对象
     */
    createNavList() {
        const _this = this;
        
        return (
            <ul>
                {
                    nav.map((v, i, a) => {
                        if (isMobile() && v.id === 'download') return null;
                        
                        return (
                            <li key={i} className={v.id === 'download' ? 'download' : ''}>
                                <a className={v.id === 'cardLibrary' ? 'active' : ''}
                                   href={v.href}
                                   data-id={v.id}>{v.name}</a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
    
    /**
     * 创建移动端导航开关
     * @return {object|null} Dom对象
     */
    createMobileBtnMenu() {
        const _this = this;
        
        if (isPC()) return null;
        
        return (
            <button className={'nav_menu' + (_this.state.mobileOpen ? ' active' : '')}
                    onClick={_this.clickMobileSwitch.bind(_this)}>
                <i /> <i /> <i />
            </button>
        );
    }
    
    /******点击事件******/
    
    /**
     * Mobile端开关
     * @return {void}
     */
    clickMobileSwitch() {
        const _this = this;
        
        if (_this.state.mobileOpen) {
            _this.setState({
                mobileOpen: false
            });
        } else {
            _this.setState({
                mobileOpen: true
            });
        }
    }
    
}
