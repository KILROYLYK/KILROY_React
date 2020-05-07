import '../../../src/css/index.less';

import { Base } from '../../../../_Base/javascript/window.ts';

import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * 首页
 */
export default class IndexComponent extends React.Component<any, any> {
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            { store } = _this.props,
            { userState, pageState } = store.getState();
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            { store } = _this.props;
        
        return (
            <Provider store={ store }>
                KILROY
            </Provider>
        );
    }
    
    /**
     * 组件安装回调
     * @return {void}
     */
    componentDidMount() {
        const _this = this,
            { store } = _this.props;
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
}
