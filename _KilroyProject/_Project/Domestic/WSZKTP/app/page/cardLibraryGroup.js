/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * Style
 */
import '../../src/css/body.less';

/**
 * Template
 */
import Nav from '../template/common/nav';
import Login from '../template/common/login';
import Footer from '../template/common/footer';
import CardLibraryGroup from '../template/cardLibraryGroup';

/**
 * CardLibraryGroupComponent
 */
export default class cardLibraryGroupComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
    
        const _this = this;
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            {store, history} = _this.props;
        
        return (
            <Provider store={store}>
                <Nav store={store} />
                <Login store={store} />
                <div id="body" className="body">
                    <div className="container">
                        <CardLibraryGroup store={store} history={history} />
                    </div>
                </div>
                <Footer store={store} />
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
    
}
