/**
 * Public
 */
import { route } from '../controller/route';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Style
 */
import '../../src/css/body.less';
import '../../src/css/index.less';

/**
 * Template
 */
import Nav from '../template/common/nav';
import Login from '../template/common/login';
import Footer from '../template/common/footer';
import { scrollTop } from "../controller/window";

/**
 * IndexComponent
 */
export default class indexComponent extends React.Component {
    
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
                        <Link to={{
                            pathname: route.decks.path,
                            search: '',
                            hash: '',
                            state: ''
                        }}
                              className='btn_go_deck'
                        >卡牌库</Link>
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
