/**
 * Public
 */
import { w, Base } from '../../../../../_Base/js/window';

/**
 * Style
 */
import '../../../src/css/share.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';
import Share from 'social-share-react';

/**
 * ShareComponent
 */
export default class shareComponent extends React.Component {
    
    /******生命周期******/
    
    /**
     * 构造函数
     * @param {object} props 参数对象
     */
    constructor(props) {
        super(props);
        
        const _this = this,
            {name} = _this.props;
        
        _this.state = {
            id: name,
            share: [
                {
                    name: 'card_share',
                    config: {
                        url: W.location.href,
                        source: '',
                        title: '欢迎您加入《巫师之昆特牌》！您将与世界各地玩家通过昆特牌一决高下！了解更多请点击：http://www.playgwent.cn',
                        origin: '',
                        description: '欢迎您加入《巫师之昆特牌》！您将与世界各地玩家通过昆特牌一决高下！了解更多请点击：http://www.playgwent.cn',
                        image: '',
                        sites: Base.isPSB.browser() !== 'Wechat'
                            ? ['weibo', 'wechat', 'qzone']
                            : ['weibo', 'qzone'],
                        disabled: ['google', 'facebook', 'twitter'],
                        wechatQrcodeTitle: '123',
                        wechatQrcodeHelper: '123',
                        wechatQrcodeLevel: 'Q',
                        wechatQrcodeSize: 120
                    }
                }
            ]
        };
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            {store} = _this.props;
        
        let config = {};
        
        Base.traversingArray(_this.state.share, (k, v) => {
            if (v.name === _this.state.id) {
                config = v.config;
            }
        });
        
        return (
            <Provider store={store}>
                <Share
                    url={config.url}
                    source={config.source}
                    title={config.title}
                    origin={config.origin}
                    description={config.description}
                    image={config.image}
                    sites={config.sites}
                    disabled={config.disabled}
                    wechatQrcodeTitle={config.wechatQrcodeTitle}
                    wechatQrcodeHelper={config.wechatQrcodeHelper}
                    wechatQrcodeLevel={config.wechatQrcodeLevel}
                    wechatQrcodeSize={config.wechatQrcodeSize} />
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
