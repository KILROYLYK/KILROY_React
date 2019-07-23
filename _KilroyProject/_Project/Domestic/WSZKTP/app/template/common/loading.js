/**
 * Style
 */
import '../../../src/css/loading.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * LoadingComponent
 */
export default class loadingComponent extends React.Component {
    
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
            show: pageState.loading
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
                {
                    _this.state.show
                        ? <div className="loading">
                            <i /><i /><i />
                        </div>
                        : null
                }
            </Provider>
        );
    }
    
    /**
     * 组件安装回调
     * @return {void}
     */
    componentDidMount() {
        const _this = this;
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
    }
    
    /******其他事件******/
    
    /**
     * 更新状态
     * @return {void}
     */
    updateState() {
        const _this = this,
            {store} = _this.props,
            {pageState} = store.getState();
        
        _this.setState({
            show: pageState.loading
        });
    }
    
    /**
     * 打开Loading
     * @return {void}
     */
    open() {
        const _this = this,
            {store} = _this.props;
        
        store.dispatch({
            type: 'openLoading'
        });
        _this.updateState();
    }
    
    /**
     * 关闭Loading
     * @return {void}
     */
    close() {
        const _this = this,
            {store} = _this.props;
        
        store.dispatch({
            type: 'closeLoading'
        });
        _this.updateState();
    }
}
