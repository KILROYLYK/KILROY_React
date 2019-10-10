/**
 * Public
 */
import { Popup } from '../../../../_Base/js/window';

/**
 * Style
 */
import '../../../../_SDK/Popup/popup.less';
import '../../../src/css/popup.less';

/**
 * React
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * PopupComponent
 */
export default class popupComponent extends React.Component {
    
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
            popup: {
                message: 'popup_message',
                deleteCardGroup: 'popup_delete_card_group'
            }
        };
        
        _this.popup = {};
        
        _this.tool = {};
        
        _this.child = {};
    }
    
    /**
     * 核心组件
     * @return {object} Dom对象
     */
    render() {
        const _this = this,
            {store} = _this.props;
        
        return (
            <Provider store={store} />
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
        
        _this.scriptPopupMessage();
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
     * 消息提示弹窗
     * @return {object} Dom对象
     */
    createPopupMessage() {
        const _this = this;
        
        return '<div class="popup_title"><span /></div>' +
            '<div class="popup_content"></div>' +
            '<button class="btn btn_1">确定</button>';
    }
    
    /**
     * 删除牌组弹窗
     * @return {object} Dom对象
     */
    createPopupDeleteCardGroup() {
        const _this = this;
        
        return '<div class="popup_title"><span>删除该攻略？</span></div>' +
            '<div class="popup_content">你的攻略和它包含的全部数据都会从牌组库中删除。</div>' +
            '<button class="btn btn_3 delete">删除</button>' +
            '<button class="btn btn_1 cancel">返回</button>';
    }
    
    /******弹窗事件******/
    
    /**
     * 消息提示弹窗
     * @return {object} Dom对象
     */
    scriptPopupMessage() {
        const _this = this;
        
        if (_this.popup.message) return;
        
        _this.popup.message = new Popup(_this.state.popup.message, {
            content: _this.createPopupMessage(),
            finishCallback: function () {
                this.$content.find('.btn_1').on('click', () => {
                    _this.popup.message.close();
                });
            },
            openCallback: function (data) {
                this.$content.find('.popup_title span').html(data.title);
                this.$content.find('.popup_content').html(data.content);
            },
            closeCallback: function () {
                this.data = {};
                this.reset();
            }
        });
        
        _this.tool.message = (data) => {
            if (!_this.popup.message) return;
            _this.popup.message.open(data);
        };
    }
    
    /**
     * 删除牌组弹窗
     * @param {function} callback 回调方法
     * @return {object} Dom对象
     */
    scriptPopupDeleteCardGroup(callback) {
        const _this = this;
        
        if (_this.popup.deleteCardGroup) return;
        
        _this.popup.deleteCardGroup = new Popup(_this.state.popup.deleteCardGroup, {
            content: _this.createPopupDeleteCardGroup(),
            finishCallback: function () {
                this.$content.find('.delete').on('click', () => {
                    if (callback) callback();
                    _this.popup.deleteCardGroup.close();
                });
                this.$content.find('.cancel').on('click', () => {
                    _this.popup.deleteCardGroup.close();
                });
            }
        });
    }
    
    /******其他事件******/
    
    /**
     * 打开创建牌组弹窗
     * @return {void}
     */
    openCreateCardGroup() {
        const _this = this;
        
        _this.tool.message({
            title: '如何向牌组库中添加牌组',
            content: '<ul><li>登录《巫师之昆特牌》</li>' +
                '<li>打开牌组编辑器，选择你的牌组并点击“分享牌组”</li>' +
                '<li>在昆特牌组分享的网页中选择【为牌组命名 & 创建攻略】</li>' +
                '<li>登录网页，描述你的牌组并发布！</li></ul>'
        });
    }
    
}
