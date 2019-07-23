/**
 * Public
 */
import { isPC } from '../../controller/window';
import { href } from '../../constant/href';

/**
 * Style
 */
import '../../../src/css/footer.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * FooterComponent
 */
export default class footerComponent extends React.Component {
    
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
            platform: pageState.platform
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
                <footer className="footer">
                    {
                        isPC()
                            ? _this.createRegister()
                            : null
                    }
                    {_this.createAttention()}
                    {_this.createLicense()}
                </footer>
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
                platform: newPageState.platform
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
     * 创建注册模块
     * @return {object} Dom对象
     */
    createRegister() {
        const _this = this;
        
        return (
            <div className="footer_register">
                <div className="logo" />
                <p>来盘昆特牌吧！</p>
                <a className="btn_register"
                   href={href.register} target="_blank">
                    <i />立即注册
                </a>
            </div>
        );
    }
    
    /**
     * 创建关注模块
     * @return {object} Dom对象
     */
    createAttention() {
        const _this = this;
        
        return (
            <div className="footer_attention">
                <p><span>关注我们</span></p>
                <div className="community">
                    <a className="wechat" href={href._void}>
                        <div className="qr_box">
                            <img src={href.qr_wechat} />
                        </div>
                    </a>
                    <a className="weibo" href={href.weibo} />
                </div>
                <div className="contact">
                    <a href={href.customer} target="_blank">
                        <i />在线客服
                    </a>
                    <a href={href.feedback} target="_blank">
                        <i />反馈
                    </a>
                    <a href={href.join} target="_blank">
                        <i />加入我们
                    </a>
                </div>
                <div className="company">
                    <a className="cdpr" href={href.cdpr} target="_blank" />
                    <a className="gaea" href={href.gaea} target="_blank" />
                </div>
            </div>
        );
    }
    
    /**
     * 创建许可模块
     * @return {object} Dom对象
     */
    createLicense() {
        const _this = this;
        
        return (
            <div className="footer_license">
                <p>
                    <a href="http://www.gaea.com/cn/law" target="_blank">法律声明</a>|
                    <a href="http://www.gaea.com/cn/privacy" target="_blank">隐私条款</a>|
                    <a href="http://www.gaea.com/cn/prevent" target="_blank">防沉迷系统</a>|
                    <a href="http://www.gaeabi.com/parent.html" target="_blank">未成年人家长监护</a>|
                    <a href="http://www.gaea.com/cn/service" target="_blank">用户服务条款</a>
                </p>
                <p>温馨提示：本游戏产品适合12岁（含）以上用户</p>
                <p>深圳市盖娅科技有限公司</p>
                <p>
                    <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">粤ICP备14092178号-9</a>|
                    <a href="https://image.gaeamobile.net/image/20181229/111405/GAEANWWW.pdf" target="_blank">粤网文[2018]11505-4011 号</a>|
                    <a href="https://image.gaeamobile.net/image/20190325/174537/GAEAICP.pdf" target="_blank">粤B2-20160276</a>
                </p>
                <p>著作权人：CD Projekt S.A.</p>
                <p>
                    <span>新广出审[2017]5561</span>|
                    <span>ISBN 978-7-7979--8722-6</span>|
                    <a href="http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/gameNetTag/4028c08c577024b801577562b9b23fe5" target="_blank">
                        文网游进字〔2017〕0105 号
                        <img src="https://image.gaeamobile.net/image/20180711/184354/label_2.png" />
                    </a>
                </p>
                <p>客服邮箱：kf-service@gaeamobile.com</p>
                <p>
                    健康游戏忠告：
                    抵制不良游戏，拒绝盗版游戏。
                    注意自我保护，谨防受骗上当。
                    适度游戏益脑，沉迷游戏伤身。
                    合理安排时间，享受健康生活。
                </p>
            </div>
        );
    }
    
}
